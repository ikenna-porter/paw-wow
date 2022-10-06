from fastapi import APIRouter, Depends 
from typing import List 
from queries.profile import (
    ProfileIn, 
    ProfileOut,
    ProfileRepository,
)    

router = APIRouter()

@router.get("/api/profiles", response_model = List[ProfileOut])
def get_all_profiles(repo: ProfileRepository = Depends()):
    return repo.get_all()

@router.post("/api/profiles", response_model = ProfileOut)
def create_profile(
    profile: ProfileIn, 
    repo: ProfileRepository = Depends()
    ):
    return repo.create(profile)    