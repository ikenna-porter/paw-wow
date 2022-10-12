from pydantic import BaseModel
from queries.pool import pool


class FollowerIn(BaseModel):
    followee: int
    follower: int

class FollowerOut(BaseModel):
    id: int
    followee: int
    follower: int

class FollowerRepository:
    def create(self, follower: FollowerIn) -> FollowerOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO followers
                        (followee, follower)
                    VALUES
                        (%s, %s)
                    RETURNING id;
                    """,
                    [
                    follower.follower,
                    follower.followee
                    ]
                )
                id = result.fetchone()[0]
                incoming_data = follower.dict()
                return FollowerOut(id=id, **incoming_data)