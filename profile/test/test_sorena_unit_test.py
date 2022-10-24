from routers.accounts import AccountToken
from queries.accounts import AccountOut
from main import app
from fastapi.testclient import TestClient
from authenticator import authenticator

client = TestClient(app)


fakeAccOut = AccountOut(id="1",email="email@email.com", username="username", roles=["string"])

fakeAccToken = AccountToken(
    access_token= "greatbig1337elephants1234",
    token_type= "Bearer",
    account= fakeAccOut,
)

async def account_out_override():
    return fakeAccOut

app.dependency_overrides[authenticator.try_get_current_account_data] = account_out_override

def test_get_account():
    response = client.get("/token", cookies={"fastapi_token":"greatbig1337elephants1234"})
    assert response.status_code == 200
    print(response.json())
    assert response.json() == fakeAccToken