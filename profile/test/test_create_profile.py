from fastapi.testclient import TestClient
from main import app
from routers.accounts import AccountToken
from queries.accounts import AccountOut
from authenticator import authenticator
from routers.profiles import create_profile
from queries.profiles import ProfileRepository

# America's test to create a profile
client = TestClient(app)

# Arrange
fakeAccount = AccountOut(id="50", username="Jamie123")

fakeAccountToken = AccountToken(
    access_token= "greatbig1337elephants1234",
    token_type= "Bearer",
    account= fakeAccount,
)

# Act
async def account_out_override():
    return fakeAccount

app.dependency_overrides[authenticator.try_get_current_account_data] = account_out_override


def test_get_account():
    response = client.get("/token", cookies={"fastapi_token":"sdjkfbds;jkfbdkf32873894732jdkh"})

# Assert
    assert response.status_code == 200
    print(response.json())
    assert response.json() == fakeAccountToken

def test_create_profile():
    #Arrange
    app.dependency_overrides[create_profile] = ProfileRepository

    json = {
        "dog_name": "Koko",
        "city": "Portland",
        "state": "OR",
        "owner_name": "Jamie",
        "owner_description": "Jamie loves the outdoors."
    }
    expected = {
        "id": 50,
        "dog_name": "Koko",
        "city": "Portland",
        "state": "OR",
        "owner_name": "Jamie",
        "owner_description": "Jamie loves the outdoors.",
        "account_id": 50
    }
    
    #Act

    response = client.post("/api/profiles", json=json, data=fakeAccount)

    #Assert
    assert response.status_code == 200
    assert response.json() == expected

    # clean up 
    app.dependency_overrides = {}
