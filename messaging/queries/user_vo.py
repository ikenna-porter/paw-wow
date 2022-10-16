from pydantic import BaseModel
from queries.pool import pool

class UserVOOut(BaseModel):
    id: int
    name: str
    picture_url: str
    profile_id: int
    profile_url: str

class UserVOIn(BaseModel):
    name: str
    picture_url: str
    profile_id: int
    profile_url: str

class UserVORepository:

    def create(self, user_vo: UserVOIn) -> UserVOOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                """
                INSERT INTO user_vos (
                      name
                    , picture_url
                    , profile_id
                    , profile_url
                ) VALUES (%s, %s, %s, %s)
                RETURNING id;
                """,
                [
                    user_vo.name, 
                    user_vo.picture_url, 
                    user_vo.profile_id, 
                    user_vo.profile_url
                ]
                )

                id = result.fetchone()[0]
                old_data = user_vo.dict()

                return UserVOOut(id=id, **old_data)
