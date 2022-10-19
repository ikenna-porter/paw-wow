from fastapi import APIRouter, Depends 
from typing import List, Optional, Union
from queries.characteristics import CharsIn, CharsOut, CharacteristicsRepository
from authenticator import authenticator


router = APIRouter()

@router.post("/api/characteristics")
def create_characteristics(
    characteristic: CharsIn,
    # account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CharacteristicsRepository = Depends()
):
    return repo.create(characteristic)

@router.delete("/api/characteristics/{profile_id}")
def delete_characteristics(
    profile_id: int,
    # account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CharacteristicsRepository = Depends(),
) -> bool:
    return repo.delete(profile_id)
    

@router.put("/api/characteristics/{profile_id}")
def update_characteristics(
    profile_id: int,
    characteristic: CharsIn,
    # account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CharacteristicsRepository = Depends(),
    ) -> CharsOut:
    return repo.update(profile_id, characteristic)

@router.get("/api/characteristics/{profile_id}")
def get_one_characteristic(
    profile_id: int,
    repo: CharacteristicsRepository = Depends()
) -> CharsOut:
    return repo.get_one(profile_id)    
