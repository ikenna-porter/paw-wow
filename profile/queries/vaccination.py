from pydantic import BaseModel
from typing import Optional
from queries.pool import pool

class VaccinationIn(BaseModel):
    distemper: Optional[bool]
    parvo: Optional[bool]
    adeno: Optional[bool]
    rabies: Optional[bool]
    other: Optional[str]

class VaccinationOut(BaseModel):
    id: int
    distemper: Optional[bool]
    parvo: Optional[bool]
    adeno: Optional[bool]
    rabies: Optional[bool]
    other: Optional[str]

class VaccinationRepository:
    def create(self, vaccination: VaccinationIn) -> VaccinationOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO vaccination
                        (distemper, parvo, adeno, rabies, other)
                    VALUES 
                        (%s, %s, %s, %s, %s)
                    RETURNING id;    
                    """,
                    [
                    vaccination.distemper,
                    vaccination.parvo,
                    vaccination.adeno,
                    vaccination.rabies,
                    vaccination.other
                    ]
                )
                id = result.fetchone()[0]
                print("PRINTING FETCHONE", id)
                incoming_data = vaccination.dict()
                return VaccinationOut(id=id, **incoming_data)