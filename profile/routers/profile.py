from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.profile import (
    ProfileIn, 
    ProfileOut,
    ProfileRepository,
    Error
)    

router = APIRouter()

@router.get("/api/profiles/{profile_id}", response_model = Optional[ProfileOut])
def get_one_profile(
    profile_id: int, 
    response: Response,
    repo: ProfileRepository = Depends()
) -> ProfileOut:

    profile = repo.get_one(profile_id)

    if profile is None:
        response.status_code = 404

    return profile

@router.get("/api/profiles", response_model = List[ProfileOut])
def get_all_profiles(repo: ProfileRepository = Depends()):
    return repo.get_all()

@router.post("/api/profiles", response_model = ProfileOut)
def create_profile(profile: ProfileIn, repo: ProfileRepository = Depends()):
    return repo.create(profile)    

@router.put("/api/profiles/{profile_id}", response_model = Union[Error, ProfileOut])
def update_profile(
    profile: ProfileIn, 
    profile_id: int, 
    repo: ProfileRepository = Depends()) -> Union[Error, ProfileOut]:
    return repo.update(profile, profile_id)

@router.delete("/api/profiles/{profile_id}", response_model = int)
def delete_profile(profile_id: int, repo: ProfileRepository = Depends()) -> bool:
    return repo.delete(profile_id)
