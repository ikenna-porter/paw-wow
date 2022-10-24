from fastapi import APIRouter, Depends, Response
from queries.vaccination_records import (
    VaccinationRecordIn, 
    VaccinationRecordOut, 
    VaccinationRecordRepository
)
from authenticator import authenticator

router = APIRouter()

@router.post("/api/vaccinations", response_model = VaccinationRecordOut)
def create_vaccination_record(
    vaccination_record: VaccinationRecordIn, 
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: VaccinationRecordRepository = Depends()
):
    return repo.create(vaccination_record, account_data)

@router.put("/api/vaccinations/{profile_id}", response_model = VaccinationRecordOut)
def update_vaccination_record(
    profile_id: int,
    vaccination_record: VaccinationRecordIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: VaccinationRecordRepository = Depends()
) -> VaccinationRecordOut:
    return repo.update(profile_id, vaccination_record)

@router.delete("/api/vaccinations/{profile_id}", response_model = bool)
def delete_vaccination_record(
    profile_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: VaccinationRecordRepository = Depends()
) -> bool:
    return repo.delete(profile_id)

@router.get("/api/vaccinations/{profile_id}")
def get_one_vaccination_record(
    profile_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: VaccinationRecordRepository = Depends()
) -> VaccinationRecordOut:
    vaccination_record = repo.get_one(profile_id)

    if vaccination_record is None:
        return {"message": "Could not retrieve vaccination records for this profile"}
    
    return vaccination_record