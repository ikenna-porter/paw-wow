from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.characteristics import CharsIn, CharsOut, CharacteristicsRepository
from authenticator import authenticator


router = APIRouter()


@router.post("/api/characteristics")
def create_characteristics(
    characteristic: CharsIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CharacteristicsRepository = Depends(),
):
    return repo.create(characteristic, account_data)


@router.delete("/api/characteristics/{profile_id}")
def delete_characteristics(
    profile_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CharacteristicsRepository = Depends(),
) -> bool:
    return repo.delete(profile_id)


@router.put("/api/characteristics/{profile_id}")
def update_characteristics(
    profile_id: int,
    characteristic: CharsIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CharacteristicsRepository = Depends(),
) -> CharsOut:
    return repo.update(profile_id, characteristic)


@router.get("/api/characteristics/{profile_id}")
def get_one_characteristic(
    profile_id: int, response: Response, repo: CharacteristicsRepository = Depends()
) -> CharsOut:
    char = repo.get_one(profile_id)
    if char is None:
        return {"message": "Could not retrieve the characteristics for this profile"}
    return char
