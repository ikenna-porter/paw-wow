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
    def create(self, characteristic: CharsIn, account_data) -> CharsOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                profile_result = db.execute(
                    """
                    SELECT *
                    FROM profiles
                    WHERE account_id = %s
                    """,
                    [account_data['id']]
                )
                profile_id = profile_result.fetchone()
                print("profile_id:", profile_id)
                print("real_profile_id:", profile_id[0])
                
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
                profile_id[0]
                ]
                )
                id = result.fetchone()[0]
                return self.characteristic_in_to_out(id, characteristic, profile_id[0])


    def update(self, characteristics_id: int, characteristic: CharsIn, account_data) -> CharsOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                profile_result = db.execute(
                    """
                    SELECT * 
                    FROM profiles
                    WHERE account_id = %s
                    """,
                    [account_data['id']]
                )
                profile_id = profile_result.fetchone()
                
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
                profile_id[0],
                characteristics_id
                ]
                )
                return self.characteristic_in_to_out(characteristics_id, characteristic, profile_id[0])


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
    

    def characteristic_in_to_out(self, id: int, characteristic: CharsIn, profile_id):
        old_data = characteristic.dict()
        return CharsOut(id=id, profile_id=profile_id, **old_data)
