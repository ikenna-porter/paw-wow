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
    
    def update(self, id: int, vaccination: VaccinationIn) -> VaccinationOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE vaccination
                    SET distemper = %s
                     , parvo = %s
                     , adeno = %s
                     , rabies = %s
                     , other = %s
                    WHERE id = %s
                    """,
                    [
                        vaccination.distemper,
                        vaccination.parvo,
                        vaccination.adeno,
                        vaccination.rabies,
                        vaccination.other,
                        id
                    ]
                )
                old_data = vaccination.dict()
                return VaccinationOut(id=id, **old_data)
    
    def delete(self, id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM vaccination
                        WHERE id = %s
                        """,
                        [id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False
    
    def get_one(self, id: int) -> VaccinationOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                         , distemper
                         , parvo
                         , adeno
                         , rabies
                         , other
                        FROM vaccination
                        WHERE id = %s
                        """,
                        [id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return VaccinationOut(
                        id=record[0],
                        distemper=record[1],
                        parvo=record[2],
                        adeno=record[3],
                        rabies=record[4],
                        other=record[5]
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not find this vaccination record"}