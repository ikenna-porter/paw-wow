from pydantic import BaseModel
from datetime import date
from typing import Union
from queries.pool import pool

class CharsIn(BaseModel):
    DOB: date
    dog_friendly: int
    kid_friendly: int
    people_friendly: int
    energy_level: int
    fixed: bool
    size: str
    profile_id: int

class CharsOut(BaseModel):
    id: int
    DOB: date
    dog_friendly: int
    kid_friendly: int
    people_friendly: int
    energy_level: int
    fixed: bool
    size: str
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
                        DOB, 
                        dog_friendly, 
                        kid_friendly, 
                        people_friendly, 
                        energy_level, 
                        fixed, 
                        size, 
                        profile_id
                    )
                VALUES
                    (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id;
                """,
                [
                characteristic.DOB, 
                characteristic.dog_friendly,
                characteristic.kid_friendly,
                characteristic.people_friendly,
                characteristic.energy_level,
                characteristic.fixed,
                characteristic.size,
                characteristic.profile_id
                ]
                )
                id = result.fetchone()[0]
                return self.characteristic_in_to_out(id, characteristic)


    def update(self, characteristics_id: int, characteristic: CharsIn) -> CharsOut:
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
                
                result = db.execute(
                    """
                    UPDATE characteristics
                    SET
                        DOB = %s,
                        dog_friendly = %s,
                        kid_friendly = %s, 
                        people_friendly = %s, 
                        energy_level = %s, 
                        fixed = %s, 
                        size = %s, 
                        profile_id = %s
                    WHERE id = %s
                    """,
                [
                characteristic.DOB, 
                characteristic.dog_friendly,
                characteristic.kid_friendly,
                characteristic.people_friendly,
                characteristic.energy_level,
                characteristic.fixed,
                characteristic.size,
                characteristic.profile_id,
                characteristics_id
                ]
                )
                return self.characteristic_in_to_out(characteristics_id, characteristic)


    def delete(self, characteristics_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM characteristics
                    WHERE id = %s
                    """,
                    [characteristics_id]
                )
                return True
    
    def get(self, profile_id: int) -> CharsOut:
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
                return CharsOut(
                    id = record[0],
                    DOB = record[1],
                    dog_friendly = record[2],
                    kid_friendly =  record[3],
                    people_friendly = record[4],
                    energy_level = record[5],
                    fixed = record[6],
                    size = record[7],
                    profile_id = record[8]
                )    

    def characteristic_in_to_out(self, id: int, characteristic: CharsIn):
        old_data = characteristic.dict()
        return CharsOut(id=id, **old_data)
