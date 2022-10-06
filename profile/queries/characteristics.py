from pydantic import BaseModel
from datetime import date
from typing import Union
from queries.pool import pool

class CharsIn(BaseModel):
    DOB: date
    dog_friendly: int
    well_trained: int
    energy_level: int
    playfulness: int

class CharsOut(BaseModel):
    id: int
    DOB: date
    dog_friendly: int
    well_trained: int
    energy_level: int
    playfulness: int

class CharacteristicsRepository:
    def create(self, characteristic: CharsIn) -> CharsOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                """
                INSERT INTO characteristics
                    (DOB, dog_friendly, well_trained, energy_level, playfulness)
                VALUES
                    (%s, %s, %s, %s, %s)
                RETURNING id;
                """,
                [
                characteristic.DOB, 
                characteristic.dog_friendly,
                characteristic.well_trained,
                characteristic.energy_level,
                characteristic.playfulness
                ]
                )
                id = result.fetchone()[0]
                return self.characteristic_in_to_out(id, characteristic)
    def update(self, characteristics_id: int, characteristic: CharsIn) -> CharsOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    UPDATE characteristics
                    SET dob = %s,
                    dog_friendly = %s,
                    well_trained = %s,
                    energy_level = %s,
                    playfulness = %s
                    WHERE id = %s
                    """,
                [
                characteristic.DOB, 
                characteristic.dog_friendly,
                characteristic.well_trained,
                characteristic.energy_level,
                characteristic.playfulness,
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
    
    def characteristic_in_to_out(self, id: int, characteristic: CharsIn):
        old_data = characteristic.dict()
        return CharsOut(id=id, **old_data)
