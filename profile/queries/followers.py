from pydantic import BaseModel
from queries.pool import pool


class FollowersIn(BaseModel):
    follower: int
    followee: int


class FollowerRepository:
    def create(self, follower: FollowersIn) -> FollowersIn:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO followers
                    (follower, followee)
                    VALUES
                    (%s, %s)
                    """,
                    [
                    follower.follower,
                    follower.followee
                    ]
                )
                incoming_data = follower.dict()
                return FollowersIn()