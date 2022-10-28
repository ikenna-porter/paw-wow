from pydantic import BaseModel
from typing import Optional
from queries.pool import pool


class VaccinationRecordIn(BaseModel):
    distemper: Optional[bool]
    parvo: Optional[bool]
    adeno: Optional[bool]
    rabies: Optional[bool]
    other: Optional[str]


class VaccinationRecordOut(BaseModel):
    id: int
    distemper: Optional[bool]
    parvo: Optional[bool]
    adeno: Optional[bool]
    rabies: Optional[bool]
    other: Optional[str]
    profile_id: int


class VaccinationRecordRepository:
    def create(
        self, vaccination_record: VaccinationRecordIn, account_data
    ) -> VaccinationRecordOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                profile_result = db.execute(
                    """
                    SELECT * 
                    FROM profiles
                    WHERE account_id = %s
                    """,
                    [account_data["id"]],
                )
                profile_id = profile_result.fetchone()[0]

                result = db.execute(
                    """
                    INSERT INTO vaccination_records
                        (distemper, parvo, adeno, rabies, other, profile_id)
                    VALUES 
                        (%s, %s, %s, %s, %s, %s)
                    RETURNING id;    
                    """,
                    [
                        vaccination_record.distemper,
                        vaccination_record.parvo,
                        vaccination_record.adeno,
                        vaccination_record.rabies,
                        vaccination_record.other,
                        profile_id,
                    ],
                )
                id = result.fetchone()[0]
                incoming_data = vaccination_record.dict()
                return VaccinationRecordOut(
                    id=id, profile_id=profile_id, **incoming_data
                )

    def update(
        self, profile_id: int, vaccination_record: VaccinationRecordIn
    ) -> VaccinationRecordOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    target_vacc = db.execute(
                        """
                    SELECT * 
                    FROM vaccination_records
                    WHERE profile_id = %s
                    """,
                        [profile_id],
                    )
                    vacc_id = target_vacc.fetchone()[0]

                    result = db.execute(
                        """
                        UPDATE vaccination_records
                        SET distemper = %s
                        , parvo = %s
                        , adeno = %s
                        , rabies = %s
                        , other = %s
                        WHERE profile_id = %s
                        """,
                        [
                            vaccination_record.distemper,
                            vaccination_record.parvo,
                            vaccination_record.adeno,
                            vaccination_record.rabies,
                            vaccination_record.other,
                            profile_id,
                        ],
                    )
                    old_data = vaccination_record.dict()
                    return VaccinationRecordOut(
                        id=vacc_id, profile_id=profile_id, **old_data
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not update vaccinations"}

    def delete(self, profile_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM vaccination_records
                        WHERE profile_id = %s
                        """,
                        [profile_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def get_one(self, profile_id: int) -> VaccinationRecordOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM vaccination_records
                        WHERE profile_id = %s
                        """,
                        [profile_id],
                    )
                    record = result.fetchone()

                    if record == None:
                        return None

                    return VaccinationRecordOut(
                        id=record[0],
                        distemper=record[1],
                        parvo=record[2],
                        adeno=record[3],
                        rabies=record[4],
                        other=record[5],
                        profile_id=record[6],
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not find this vaccination record"}
