from fastapi import APIRouter, Depends, Response
from typing import List
from queries.friendships import (
    FriendshipRepository, 
    FriendshipIn, 
    FriendshipOut
)

router = APIRouter()

@router.post("/api/friendships", response_model = FriendshipOut)
def create_friendship(
    friendship: FriendshipIn,
    repo: FriendshipRepository = Depends()
):
    return repo.create(friendship)

@router.get("/api/friendships/{user_one}", response_model= List[FriendshipOut])
def get_friendlist(
    user_one: int,
    # friendship: FriendshipIn,
    repo: FriendshipRepository = Depends()

):
    return repo.get_friendlist(user_one)