from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str

class ProfileIn(BaseModel):
    dog_name: str
    city: str
    state: str
    account_id: int
    owner_name: Optional[str]
    owner_description: Optional[str]
    avatar: Optional[str]

class ProfileOut(BaseModel):
    id: int
    dog_name: str
    city: str
    state: str
    account_id: int
    owner_name: Optional[str]
    owner_description: Optional[str]
    avatar: Optional[str] 



class ProfileRepository:
    def create(self, profile: ProfileIn) -> ProfileOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO profiles
                        (dog_name, city, state, account_id, owner_name, owner_description, avatar)
                    VALUES 
                        (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;    
                    """,
                    [
                    profile.dog_name,
                    profile.city,
                    profile.state,
                    profile.account_id,
                    profile.owner_name,
                    profile.owner_description,
                    profile.avatar
                    ]
                )
                id = result.fetchone()[0]
                incoming_data = profile.dict()
                return ProfileOut(id=id, **incoming_data)              


    def get_all(self) -> List[ProfileOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, dog_name, city, state, account_id, owner_name, owner_description, avatar
                        FROM profiles;
                        """
                    )
                    return [ProfileOut(
                        id = record[0],
                        dog_name = record[1],
                        city = record[2],
                        state = record[3],
                        account_id = record[4],
                        owner_name = record[5],
                        owner_description = record[6],
                        avatar = record[7],
                    )
                    for record in db 
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all profiles."}     

    def get_one(self, profile_id: int)  -> Optional[ProfileOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , dog_name
                            , city
                            , state
                            , account_id
                            , owner_name
                            , owner_description
                            , avatar
                        FROM profiles
                        WHERE id = %s
                        """,
                        [profile_id]
                    )
                    record = result.fetchone()

                    if record is None:
                        return None
                    
                    return self.record_to_profile_out(record)

        except Exception as e:
            print("########################################",e)
            return {"message": "Error in retrieving profile detail."}
    
    def update(self, profile: ProfileIn, profile_id: int, account_data) -> Union[ProfileOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE profiles
                        SET dog_name = %s
                        ,   city = %s
                        ,   state = %s
                        ,   account_id = %s
                        ,   owner_name = %s
                        ,   owner_description = %s
                        ,   avatar = %s
                        WHERE id= %s
                        """,
                        [
                            profile.dog_name, 
                            profile.city, 
                            profile.state, 
                            account_data['id'],
                            profile.owner_name, 
                            profile.owner_description, 
                            profile.avatar,
                            profile_id
                        ]
                    )
                    return self.profile_in_to_out(profile_id, profile, account_data)

        except Exception as e:
            print(e)
            return {"message": "Could not update profile detail."}
    
    def delete(self, profile_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM profiles
                        WHERE id = %s
                        """,
                        [profile_id]
                    )
                return True

        except Exception as e:
            return False


    def profile_in_to_out(self, id: int, profile: ProfileIn, account_data):
        old_data = profile.dict()
        return ProfileOut(id=id, account_id=account_data["id"], **old_data)


    def record_to_profile_out(self, record):
        return ProfileOut(
            id = record[0],
            dog_name = record[1],
            city = record[2],
            state = record[3],
            owner_name = record[4],
            owner_description = record[5],
            avatar = record[6],
        )