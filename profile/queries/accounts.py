from pydantic import BaseModel
from queries.pool import pool


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    username: str
    password: str


class AccountOut(BaseModel):
    id: int
    username: str


class Account(BaseModel):
    id: int
    username: str
    hashed_password: str


class AccountRepository:
    def get(self, username: str) -> Account:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, username, hashed_password
                    FROM accounts
                    WHERE username = %s; 
                    """,
                    [username],
                )
                record = result.fetchone()
                if record is None:
                    return None
                return Account(
                    id=record[0],
                    username=record[1],
                    hashed_password=record[2],
                )

    def create(self, account: AccountIn, hashed_password: str) -> Account:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO accounts (username, hashed_password)
                    VALUES (%s, %s)
                    RETURNING id;
                    """,
                    [account.username, hashed_password],
                )
                id = result.fetchone()[0]
                return Account(
                    id=id, username=account.username, hashed_password=hashed_password
                )

    def delete(self, accounts_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM accounts
                        WHERE id = %s
                        """,
                        [accounts_id],
                    )
                return True

        except Exception as e:
            return False
