from fastapi import APIRouter, Depends, Response
from queries.vaccination_records import (
    VaccinationRecordIn, 
    VaccinationRecordOut, 
    VaccinationRecordRepository
)
from authenticator import authenticator

router = APIRouter()

@router.post("/api/vaccination", response_model = VaccinationRecordOut)
def create_vaccination_record(
    vaccination_record: VaccinationRecordIn, 
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: VaccinationRecordRepository = Depends()
):
    return repo.create(vaccination_record, account_data)

@router.put("/api/vaccination/{id}", response_model = VaccinationRecordOut)
def update_vaccination_record(
    vaccination_id: int,
    vaccination_record: VaccinationRecordIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: VaccinationRecordRepository = Depends()
) -> VaccinationRecordOut:
    return repo.update(vaccination_id, vaccination_record, account_data)

@router.delete("/api/vaccination/{id}", response_model = bool)
def delete_vaccination_record(
    id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: VaccinationRecordRepository = Depends()
) -> bool:
    return repo.delete(id)

@router.get("/api/vaccination/{id}", response_model = VaccinationRecordOut)
def get_one_vaccination_record(
    id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: VaccinationRecordRepository = Depends()
) -> VaccinationRecordOut:
    vaccination_record = repo.get_one(id)
    if vaccination_record is None:
        response.status_code = 404
    return vaccination_record