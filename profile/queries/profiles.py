from pydantic import BaseModel
from datetime import date
from typing import Optional, List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class ProfileIn(BaseModel):
    dog_name: str
    city: str
    state: str
    owner_name: Optional[str]
    owner_description: Optional[str]
    social_media: Optional[str]


class CompleteProfile(BaseModel):
    profile_id: int
    dog_name: str
    city: str
    state: str
    owner_name: str
    img: str | None
    DOB: date | None
    fixed: bool | None
    size: str | None
    gender: str | None
    dog_bio: str | None


class ProfileOut(BaseModel):
    id: int
    dog_name: str
    city: str
    state: str
    owner_name: Optional[str]
    owner_description: Optional[str]
    account_id: int
    social_media: Optional[str]


class ProfileRepository:
    def create(self, profile: ProfileIn, account_data) -> ProfileOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO profiles
                        (dog_name, city, state, owner_name, owner_description, account_id, social_media)
                    VALUES 
                        (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;    
                    """,
                    [
                        profile.dog_name,
                        profile.city,
                        profile.state,
                        profile.owner_name,
                        profile.owner_description,
                        account_data["id"],
                        profile.social_media,
                    ],
                )
                profile_id = result.fetchone()[0]
                old_data = profile.dict()
                return ProfileOut(
                    id=profile_id, account_id=account_data["id"], **old_data
                )

    def get_all(self) -> Union[Error, List[CompleteProfile]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT 
                            p.id, 
                            p.dog_name, 
                            p.city, 
                            p.state, 
                            p.owner_name, 
                            pp.image, 
                            c.dob, 
                            c.fixed, 
                            c.size, 
                            c.gender, 
                            c.dog_bio
                        FROM profiles AS p
                        LEFT OUTER JOIN characteristics AS c
                        ON p.id = c.profile_id
                        LEFT OUTER JOIN profile_pictures AS pp
                        ON p.id = pp.profile_id
                        """
                    )
                    return [
                        CompleteProfile(
                            profile_id=record[0],
                            dog_name=record[1],
                            city=record[2],
                            state=record[3],
                            owner_name=record[4],
                            img=record[5],
                            DOB=record[6],
                            fixed=record[7],
                            size=record[8],
                            gender=record[9],
                            dog_bio=record[10],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all profiles"}

    def get_one(self, username: str) -> Optional[ProfileOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    account = db.execute(
                        """
                        SELECT * 
                        FROM accounts
                        WHERE username = %s
                        """,
                        [username],
                    )
                    account_info = account.fetchone()

                    result = db.execute(
                        """
                        SELECT *
                        FROM profiles
                        WHERE account_id = %s
                        """,
                        [account_info[0]],
                    )
                    record = result.fetchone()

                    if record is None:
                        return None

                    return self.record_to_profile_out(record)

        except Exception as e:
            return {"message": "Error in retrieving profile detail."}

    def update(self, profile: ProfileIn, username: str) -> Union[ProfileOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT accounts.username, accounts.id AS account_id, profiles.id AS profile_id 
                        FROM accounts
                        INNER JOIN profiles
                        ON accounts.id = profiles.account_id AND accounts.username = %s
                        """,
                        [username],
                    )
                    info = result.fetchone()

                    db.execute(
                        """
                        UPDATE profiles
                        SET dog_name = %s,
                            city = %s,
                            state = %s,
                            owner_name = %s,
                            owner_description = %s,
                            account_id = %s,
                            social_media = %s
                        WHERE account_id= %s
                        """,
                        [
                            profile.dog_name,
                            profile.city,
                            profile.state,
                            profile.owner_name,
                            profile.owner_description,
                            info[1],
                            profile.social_media,
                            info[1],
                        ],
                    )
                    old_data = profile.dict()
                    return ProfileOut(id=info[2], account_id=info[1], **old_data)

        except Exception as e:
            print(e)
            return {"message": "Could not update profile detail."}

    def delete(self, username: str):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    account = db.execute(
                        """
                        SELECT * 
                        FROM accounts
                        WHERE username = %s
                        """,
                        [username],
                    )
                    account_info = account.fetchone()

                    db.execute(
                        """
                        DELETE FROM profiles
                        WHERE account_id = %s
                        """,
                        [account_info[0]],
                    )
                return True

        except Exception as e:
            return False

    def record_to_profile_out(self, record):
        return ProfileOut(
            id=record[0],
            dog_name=record[1],
            city=record[2],
            state=record[3],
            owner_name=record[4],
            owner_description=record[5],
            account_id=record[6],
            social_media=record[7],
        )
