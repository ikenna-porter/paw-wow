from pydantic import BaseModel
from queries.pool import pool
from typing import List


class FriendshipIn(BaseModel):
    status: int
    user_one: int
    user_two: int

class FriendshipOut(BaseModel):
    id: int
    status:int
    user_one: int
    user_two: int

class FriendListOut(BaseModel):
    dog_name: str
    user_one: int
    user_two: int
    status: int
    id: int

class FriendsOut(BaseModel):
    dog_name: str


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
                    [
                    friendship.status,
                    friendship.user_one,
                    friendship.user_two
                    ]
                )
                id = result.fetchone()[0]
                incoming_data = friendship.dict()
                return FriendshipOut(id=id, **incoming_data)

    def get_friend_list(self, id) -> List:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT profiles.id, profiles.dog_name, friendships.user_one, friendships.user_two, friendships.status
                        FROM profiles
                        INNER JOIN friendships ON profiles.id=friendships.user_one OR profiles.id=friendships.user_two
                        WHERE status=1
                        AND (user_one = %(user_one)s
                        OR user_two = %(user_one)s)
                        AND NOT profiles.id = %(user_one)s;
                        """,
                        {"user_one": id}
                    )
                    result = []
                    for record in db:
                        result.append(record[1])
                    print(result)
                    return result
        except Exception as e:
            print(e)
            return {"Message": "You have no Paw Pals yet"}

    def get_pending_requests(self, user_two) -> List[FriendshipOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT profiles.dog_name, friendships.user_one, friendships.user_two, friendships.status, friendships.id 
                        FROM profiles
                        INNER JOIN friendships ON profiles.id=friendships.user_one
                        WHERE user_two = %s
                        AND status = 0;
                        """,
                        [user_two]
                    )
                    return_list = [FriendListOut(
                        dog_name = record[0],
                        user_one = record[1],
                        user_two = record[2],
                        status= record[3],
                        id = record[4]
                    )
                    for record in db]
                    print("TESTING", return_list)
                    return return_list
        except Exception as e:
            print(e)
            return {"Message": "You have no pending requests"}

    def approve_request(self, id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE friendships
                        SET status = 1
                        WHERE id = %s
                        """,
                        [id]
                    )
                    if result:
                        return True
                    return False
        except Exception as e:
            print(e)
            return {"Message": "This request does not exist."}

    def deny_request(self, id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        DELETE FROM friendships
                        WHERE id = %s;
                        """,
                        [id]
                        # """
                        # DELETE FROM friendships
                        # WHERE user_one = %s
                        # AND user_two = %s
                        # """,
                        # [
                        #     user_one, 
                        #     user_two
                        # ]
                        # user_one: int, user_two: int
                    )
                    if result:
                        return True
                    return False
        except Exception as e:
            print(e)
            return {"Message": "This request does not exist."}