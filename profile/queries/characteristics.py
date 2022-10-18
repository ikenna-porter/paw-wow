from pydantic import BaseModel
from datetime import date
from typing import Union
from queries.pool import pool

class CharsIn(BaseModel):
    dog_friendly: int
    kid_friendly: int
    people_friendly: int
    energy_level: int
    DOB: date
    breed: str
    fixed: bool
    size: str
    gender: str
    dog_bio: str
    profile_id: int

class CharsOut(BaseModel):
    id: int
    dog_friendly: int
    kid_friendly: int
    people_friendly: int
    energy_level: int
    DOB: date
    breed: str
    fixed: bool
    size: str
    gender: str
    dog_bio: str
    profile_id: int

class CharacteristicsRepository:
    def create(self, characteristic: CharsIn) -> CharsOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                # profile_result = db.execute(
                #     """
                #     SELECT *
                #     FROM profiles
                #     WHERE account_id = %s
                #     """,
                #     [account_data['id']]
                # )
                # profile_id = profile_result.fetchone()
                # print("profile_id:", profile_id)
                # print("real_profile_id:", profile_id[0])
                
                result = db.execute(
                """
                INSERT INTO characteristics
                    ( 
                        dog_friendly, 
                        kid_friendly, 
                        people_friendly, 
                        energy_level, 
                        DOB,
                        breed,
                        fixed, 
                        size, 
                        gender,
                        dog_bio,
                        profile_id
                    )
                VALUES
                    (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id;
                """,
                [ 
                    characteristic.dog_friendly,
                    characteristic.kid_friendly,
                    characteristic.people_friendly,
                    characteristic.energy_level,
                    characteristic.DOB,
                    characteristic.breed,
                    characteristic.fixed,
                    characteristic.size,
                    characteristic.gender,
                    characteristic.dog_bio,
                    characteristic.profile_id
                ]
                )
                id = result.fetchone()[0]
                return self.characteristic_in_to_out(id, characteristic)


    def update(self, profile_id: int, characteristic: CharsIn) -> CharsOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                target_char = db.execute(
                    """
                    SELECT * 
                    FROM characteristics
                    WHERE profile_id = %s
                    """,
                    [profile_id]
                )
                char_id = target_char.fetchone()
                
                db.execute(
                    """
                    UPDATE characteristics
                    SET
                        dog_friendly = %s,
                        kid_friendly = %s, 
                        people_friendly = %s, 
                        energy_level = %s, 
                        DOB = %s,
                        breed = %s,
                        fixed = %s, 
                        size = %s, 
                        gender = %s,
                        dog_bio = %s,
                        profile_id = %s
                    WHERE profile_id = %s
                    """,
                    [ 
                        characteristic.dog_friendly,
                        characteristic.kid_friendly,
                        characteristic.people_friendly,
                        characteristic.energy_level,
                        characteristic.DOB,
                        characteristic.breed,
                        characteristic.fixed,
                        characteristic.size,
                        characteristic.gender,
                        characteristic.dog_bio,
                        characteristic.profile_id,
                        profile_id
                    ]
                )
                return self.characteristic_in_to_out(char_id[0], characteristic)


    def delete(self, profile_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM characteristics
                    WHERE profile_id = %s
                    """,
                    [profile_id]
                )
                return True
    
    def get_one(self, profile_id: int) -> CharsOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT * 
                    FROM characteristics
                    WHERE profile_id = %s
                    """,
                    [profile_id]
                )
                record = result.fetchone()
                if record == None:
                    return None 
                return CharsOut(
                    id = record[0],
                    dog_friendly = record[1],
                    kid_friendly =  record[2],
                    people_friendly = record[3],
                    energy_level = record[4],
                    DOB = record[5],
                    breed = record[6],
                    fixed = record[7],
                    size = record[8],
                    gender = record[9],
                    dog_bio = record[10],
                    profile_id = record[11]
                )    

    def characteristic_in_to_out(self, id: int, characteristic: CharsIn):
        old_data = characteristic.dict()
        return CharsOut(id=id, **old_data)
