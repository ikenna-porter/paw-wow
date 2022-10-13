from pydantic import BaseModel
from queries.pool import pool


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