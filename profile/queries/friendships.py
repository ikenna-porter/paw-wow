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

    def get_friendlist(self, user_one) -> List[FriendshipOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *  
                        FROM friendships
                        WHERE user_1 = %s;
                        """,
                        [user_one]
                    )
                    return [FriendshipOut(
                        id = record[0],
                        status = record[1],
                        user_one = record[2],
                        user_two= record[3],
                    )
                    for record in db]
        except Exception as e:
            print(e)
            return {"Message": "WHAT A LOSER! YOU HAVE NO PAW PALS"}