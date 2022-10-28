from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool


class ProfilePicRepository:
    def upload(self, data_URI: str, profile_id: int):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO profile_pictures 
                        (image, profile_id)
                    VALUES (%s, %s)   
                    RETURNING id; 
                    """,
                    [data_URI, profile_id],
                )
                pic_id = result.fetchone()[0]
                return {
                    "message": "successfully stored img in database",
                    "img_id": pic_id,
                }

    def get_one(self, profile_id: int):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT * 
                    FROM profile_pictures
                    WHERE profile_id = %s;
                    """,
                    [profile_id],
                )
                record = result.fetchone()

                if record == None:
                    return None

                return {"id": record[0], "URI": record[2], "profile_id": record[3]}

    def update(self, data_URI: str, profile_id: int):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    UPDATE profile_pictures
                    SET image = %s, profile_id = %s
                    WHERE profile_id = %s
                    """,
                    [data_URI, profile_id, profile_id],
                )
                return {f"message": "successfully updated img for profile {profile_id}"}
