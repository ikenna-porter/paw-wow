from fastapi import APIRouter, Depends 
from typing import List, Optional, Union
from queries.characteristics import CharsIn, CharsOut, CharacteristicsRepository
from authenticator import authenticator


router = APIRouter()

@router.post("/api/characteristics")
def create_characteristics(
    characteristic: CharsIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CharacteristicsRepository = Depends()
):
    return repo.create(characteristic, account_data)

@router.delete("/api/characteristics/{characteristics_id}")
def delete_characteristics(
    characteristics_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CharacteristicsRepository = Depends(),
) -> bool:
    return repo.delete(characteristics_id)
    

@router.put("/api/characteristics/{characteristics_id}")
def update_characteristics(
    characteristics_id: int,
    characteristic: CharsIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CharacteristicsRepository = Depends(),
    ) -> CharsOut:
    return repo.update(characteristics_id, characteristic, account_data)
