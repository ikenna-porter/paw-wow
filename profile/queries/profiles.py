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
    avatar: Optional[str]
    account_id: int

class ProfileOut(BaseModel):
    id: int
    dog_name: str
    city: str
    state: str
    owner_name: Optional[str]
    owner_description: Optional[str]
    avatar: Optional[str] 
    account_id: int



class ProfileRepository:
    def create(self, profile: ProfileIn) -> ProfileOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO profiles
                        (dog_name, city, state, owner_name, owner_description, avatar, account_id)
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
                    profile.avatar,
                    profile.account_id
                    ]
                )
                profile_id = result.fetchone()[0]     
                return self.profile_in_to_out(profile_id, profile)        


    def get_all(self) -> Union[Error, List[ProfileOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, dog_name, city, state, owner_name, owner_description, avatar, account_id
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
                        avatar = record[6],
                        account_id = record[7]
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
                        SELECT id
                            , dog_name
                            , city
                            , state
                            , owner_name
                            , owner_description
                            , avatar
                            , account_id
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
            print("########################################",e)
            return {"message": "Error in retrieving profile detail."}
    
    def update(self, profile: ProfileIn, username: str) -> Union[ProfileOut, Error]:
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

                    profile = db.execute(
                        """
                        SELECT * 
                        FROM profiles
                        WHERE account_id = %s
                        """,
                        [account_info[0]]
                    ) 
                    profile_id = profile.fetchone()

                    db.execute(
                        """
                        UPDATE profiles
                        SET 
                            dog_name = %s,
                            city = %s,
                            state = %s,
                            owner_name = %s,
                            owner_description = %s,
                            avatar = %s,
                            account_id = %s
                        WHERE account_id= %s
                        """,
                        [
                            profile.dog_name, 
                            profile.city, 
                            profile.state, 
                            profile.owner_name, 
                            profile.owner_description, 
                            profile.avatar,
                            profile.account_id,
                            account_info[0]
                        ]
                    )
                    return self.profile_in_to_out(profile_id[0], profile)

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


    def profile_in_to_out(self, id: int, profile: ProfileIn):
        old_data = profile.dict()
        return ProfileOut(id=id, **old_data)


    def record_to_profile_out(self, record):
        return ProfileOut(
            id = record[0],
            dog_name = record[1],
            city = record[2],
            state = record[3],
            owner_name = record[4],
            owner_description = record[5],
            avatar = record[6],
            account_id = record[7]
        )