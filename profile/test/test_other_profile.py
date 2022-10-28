from main import app
from fastapi.testclient import TestClient
from queries.otherprofile import OtherProfileRepository

client = TestClient(app)


class FakeOtherProfileRepository:
    def get_single_profile(self, id: int):
        return {
            "id": 1,
            "dog_friendly": 2,
            "kid_friendly": 4,
            "people_friendly": 4,
            "energy_level": 5,
            "DOB": "2022-10-06",
            "breed": "cat",
            "fixed": True,
            "size": "Small",
            "gender": "Female",
            "dog_bio": "cat",
            "image": "cat",
            "dog_name": "dog1",
            "city": "city1",
            "state": "MN",
            "owner_name": "owner1",
            "owner_description": "string1",
            "distemper": True,
            "parvo": True,
            "adeno": True,
            "rabies": True,
            "other": "1",
        }


def test_get_single_profile():
    app.dependency_overrides[OtherProfileRepository] = FakeOtherProfileRepository
    response = client.get("api/profile/1")
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "dog_friendly": 2,
        "kid_friendly": 4,
        "people_friendly": 4,
        "energy_level": 5,
        "DOB": "2022-10-06",
        "breed": "cat",
        "fixed": True,
        "size": "Small",
        "gender": "Female",
        "dog_bio": "cat",
        "image": "cat",
        "dog_name": "dog1",
        "city": "city1",
        "state": "MN",
        "owner_name": "owner1",
        "owner_description": "string1",
        "distemper": True,
        "parvo": True,
        "adeno": True,
        "rabies": True,
        "other": "1",
    }
