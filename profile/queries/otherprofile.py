from pydantic import BaseModel
from datetime import date
from typing import Optional
from queries.pool import pool

class OtherProfile(BaseModel):
    id: int
    dog_friendly: Optional[int]
    kid_friendly: Optional[int]
    people_friendly: Optional[int]
    energy_level: Optional[int]
    DOB: Optional[date]
    breed: Optional[str]
    fixed: Optional[bool]
    size: Optional[str]
    gender: Optional[str]
    dog_bio: Optional[str]
    image: Optional[str]
    dog_name: str
    city: str
    state: str
    owner_name: Optional[str]
    owner_description: Optional[str]
    distemper: Optional[bool]
    parvo: Optional[bool]
    adeno: Optional[bool]
    rabies: Optional[bool]
    other: Optional[str]



class OtherProfileRepository:
    def get_single_profile(self, id: int) -> OtherProfile:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    profile = db.execute(
                    """
                    SELECT profiles.id, characteristics.dog_friendly, characteristics.kid_friendly, characteristics.people_friendly
                    , characteristics.energy_level, characteristics.dob, characteristics.breed, characteristics.fixed
                    , characteristics.size, characteristics.gender, characteristics.dog_bio, profile_pictures.image
                    , profiles.dog_name, profiles.city, profiles.state, profiles.owner_name, profiles.owner_description
                    , vaccination_records.distemper, vaccination_records.parvo, vaccination_records.adeno
                    , vaccination_records.rabies, vaccination_records.other
                    FROM profiles
                    LEFT JOIN characteristics ON profiles.id = characteristics.profile_id
                    LEFT JOIN profile_pictures ON profiles.id = profile_pictures.profile_id
                    LEFT JOIN vaccination_records ON profiles.id = vaccination_records.profile_id
                    WHERE profiles.id = %s
                    """,
                    [id]
                    )
                    result = profile.fetchone()
                    print(result)
                    return OtherProfile(
                        id = result[0],
                        dog_friendly = result[1],
                        kid_friendly = result[2],
                        people_friendly = result[3],
                        energy_level = result[4],
                        DOB = result[5],
                        breed = result[6],
                        fixed = result[7],
                        size = result[8],
                        gender = result[9],
                        dog_bio = result[10],
                        image = result[11],
                        dog_name = result[12],
                        city = result[13],
                        state = result[14],
                        owner_name = result[15],
                        owner_description = result[16],
                        distemper = result[17],
                        parvo = result[18],
                        adeno = result[19],
                        rabies = result[20],
                        other = result[21]
                        )