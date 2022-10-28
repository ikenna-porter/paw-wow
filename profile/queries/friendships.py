from pydantic import BaseModel
from queries.pool import pool
from typing import List


class FriendshipIn(BaseModel):
    status: int
    user_one: int
    user_two: int


class FriendshipOut(BaseModel):
    id: int
    status: int
    user_one: int
    user_two: int


class FriendListOut(BaseModel):
    dog_name: str
    city: str
    state: str
    user_one: int
    image: str | None


class FriendsOut(BaseModel):
    image: str | None
    dog_name: str
    city: str
    state: str
    id: int


class FriendshipRepository:
    def create(self, friendship: FriendshipIn) -> FriendshipOut:

        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO friendships
                        (status, user_one, user_two)
                    VALUES
                        (%s, %s, %s)
                    RETURNING id;
                    """,
                    [friendship.status, friendship.user_one, friendship.user_two],
                )
                id = result.fetchone()[0]
                incoming_data = friendship.dict()
                return FriendshipOut(id=id, **incoming_data)

    def get_friend_list(self, id) -> List[FriendsOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT profile_pictures.image, profiles.dog_name, profiles.city, profiles.state, profiles.id
                        FROM profiles
                        LEFT JOIN profile_pictures ON profiles.id=profile_pictures.profile_id
                        INNER JOIN friendships ON profiles.id=friendships.user_one OR profiles.id=friendships.user_two
                        WHERE status=1
                        AND (user_one = %(user_one)s
                        OR user_two = %(user_one)s)
                        AND NOT profiles.id = %(user_one)s;
                        """,
                        {"user_one": id},
                    )
                    result = [
                        FriendsOut(
                            image=record[0],
                            dog_name=record[1],
                            city=record[2],
                            state=record[3],
                            id=record[4],
                        )
                        for record in db
                    ]
                    return result
        except Exception as e:
            return e

    def get_pending_requests(self, user_two) -> List[FriendListOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    data_back = db.execute(
                        """
                        SELECT profiles.dog_name, profiles.city, profiles.state, friendships.user_one, profile_pictures.image
                        FROM profiles
                        LEFT OUTER JOIN profile_pictures ON profile_pictures.profile_id=profiles.id
                        INNER JOIN friendships ON profiles.id=friendships.user_one
                        WHERE user_two = %s
                        AND status = 0;
                        """,
                        [user_two],
                    )
                    real_result = data_back.fetchall()
                    return_list = [
                        FriendListOut(
                            dog_name=record[0],
                            city=record[1],
                            state=record[2],
                            user_one=record[3],
                            image=record[4],
                        )
                        for record in real_result
                    ]
                    return return_list
        except Exception as e:
            return e

    def approve_request(self, user_one):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE friendships
                        SET status = 1
                        WHERE user_one = %s
                        """,
                        [user_one],
                    )
                    if result:
                        return True
                    return False
        except Exception as e:
            return e

    def deny_request(self, user_one):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        DELETE FROM friendships
                        WHERE user_one = %s;
                        """,
                        [user_one],
                    )
                    if result:
                        return True
                    return False
        except Exception as e:
            return e
