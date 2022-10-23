from pydantic import BaseModel
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
    account_id: int

class UpdateProfileIn(BaseModel):
    dog_name: str
    city: str
    state: str
    owner_name: Optional[str]
    owner_description: Optional[str]

class ProfileOut(BaseModel):
    id: int
    dog_name: str
    city: str
    state: str
    owner_name: Optional[str]
    owner_description: Optional[str]
    account_id: int


class ProfileRepository:
    def create(self, profile: ProfileIn) -> ProfileOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO profiles
                        (dog_name, city, state, owner_name, owner_description, account_id)
                    VALUES 
                        (%s, %s, %s, %s, %s, %s)
                    RETURNING id;    
                    """,
                    [
                    profile.dog_name,
                    profile.city,
                    profile.state,
                    profile.owner_name,
                    profile.owner_description,
                    profile.account_id
                    ]
                )
                profile_id = result.fetchone()[0]     
                old_data = profile.dict()
                return ProfileOut(id=profile_id, **old_data)
         


    def get_all(self) -> Union[Error, List[ProfileOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM profiles;
                        """
                    )
                    return [ProfileOut(
                        id = record[0],
                        dog_name = record[1],
                        city = record[2],
                        state = record[3],
                        owner_name = record[4],
                        owner_description = record[5],
                        account_id = record[6]
                    )
                    for record in db 
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all profiles."}     

    def get_one(self, username: str)  -> Optional[ProfileOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    account = db.execute(
                        """
                        SELECT * 
                        FROM accounts
                        WHERE username = %s
                        """,
                        [username]
                    )
                    account_info = account.fetchone()

                    result = db.execute(
                        """
                        SELECT *
                        FROM profiles
                        WHERE account_id = %s
                        """,
                        [account_info[0]]
                    )
                    record = result.fetchone()

                    if record is None:
                        return None
                    
                    return self.record_to_profile_out(record)

        except Exception as e:
            return {"message": "Error in retrieving profile detail."}
    
    def update(self, profile: UpdateProfileIn, username: str) -> Union[ProfileOut, Error]:
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
                        [username]
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
                            account_id = %s
                        WHERE account_id= %s
                        """,
                        [
                            profile.dog_name, 
                            profile.city, 
                            profile.state, 
                            profile.owner_name, 
                            profile.owner_description, 
                            info[1],
                            info[1]
                        ]
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
                        [username]
                    )
                    account_info = account.fetchone()

                    db.execute(
                        """
                        DELETE FROM profiles
                        WHERE account_id = %s
                        """,
                        [account_info[0]]
                    )
                return True

        except Exception as e:
            return False


    def record_to_profile_out(self, record):
        return ProfileOut(
            id = record[0],
            dog_name = record[1],
            city = record[2],
            state = record[3],
            owner_name = record[4],
            owner_description = record[5],
            account_id = record[6]
        )