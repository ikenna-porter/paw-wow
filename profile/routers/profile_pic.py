from fastapi import APIRouter, File, UploadFile, Depends, Form
from queries.profile_pic import ProfilePicRepository
import base64

router = APIRouter()

@router.post("/api/profile-pic/{profile_id}")
async def upload_picture(
    profile_id: int,
    data_URI: str = Form(...),
    repo: ProfilePicRepository = Depends()
):
    return repo.upload(data_URI, profile_id)

@router.get("/api/profile-pic/{profile_id}")
async def get_pic(
    profile_id: int,
    repo: ProfilePicRepository = Depends()
):
    return repo.get_one(profile_id)

@router.put("/api/profile-pic/{profile_id}") 
async def update_pic(
    profile_id: int,
    data_URI: str = Form(...),
    repo: ProfilePicRepository = Depends()
):
    return repo.update(data_URI, profile_id)