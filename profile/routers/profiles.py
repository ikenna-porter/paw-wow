from fastapi import APIRouter, Depends
from typing import List, Union, Optional
from queries.profiles import (
    ProfileIn,
    ProfileOut,
    ProfileRepository,
    CompleteProfile,
    Error,
)
from authenticator import authenticator

router = APIRouter()


@router.get("/api/profiles/{username}", response_model=Optional[ProfileOut])
def get_one_profile(
    username: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProfileRepository = Depends(),
) -> ProfileOut:
    profile = repo.get_one(username)

    if profile is None:
        return {"message: profile not found"}

    return profile


@router.get("/api/profiles", response_model=Union[List[CompleteProfile], Error])
def get_all_profiles(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProfileRepository = Depends(),
):
    return repo.get_all()


@router.post("/api/profiles", response_model=ProfileOut)
def create_profile(
    profile: ProfileIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProfileRepository = Depends(),
):
    return repo.create(profile, account_data)


@router.put("/api/profiles/{username}", response_model=Union[Error, ProfileOut])
def update_profile(
    profile: ProfileIn,
    username: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProfileRepository = Depends(),
) -> Union[Error, ProfileOut]:
    return repo.update(profile, username)


@router.delete("/api/profiles/{username}", response_model=bool)
def delete_profile(
    username: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProfileRepository = Depends(),
) -> bool:
    return repo.delete(username)
