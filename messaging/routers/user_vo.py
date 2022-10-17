from fastapi import APIRouter, Depends
from typing import List
from queries.user_vo import (
    UserVOIn,
    UserVOOut,
    UserVORepository
)

router = APIRouter()

@router.post("/api/user=", response_model = UserVOOut)
def create(
    user_vo: UserVOIn, 
    repo: UserVORepository = Depends()
) -> UserVOOut:
    repo.create(user_vo)
