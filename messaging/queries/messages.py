from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool

class MessageOut(BaseModel):
    id: int
    sender: str
    recipient: str
    timestamp: str
    content: str
    read: int
    chat_id: int

class MessageRepository:
    def get_all_messages(self, chat_id: int) -> List[MessageOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, sender, recipient, timestamp, content, read, chat_id
                        FROM messages
                        WHERE chat_id = %s;
                        """,
                        [chat_id]
                    )
                    record = result.fetchall()

                    return [ MessageOut (
                        id = record[0],
                        sender = record[1],
                        recipient = record[2],
                        timestamp = record[3],
                        content = record[4],
                        read = record[5],
                        chat_id = record[6],
                    )
                    for record in db 
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all profiles."}