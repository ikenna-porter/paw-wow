from pydantic import BaseModel
from typing import List
from queries.pool import pool
from datetime import datetime


class MessageOut(BaseModel):
    id: int
    sender: int
    recipient: int
    timestamp: datetime
    content: str
    conversation_id: int


class MessageIn(BaseModel):
    sender: int
    recipient: int
    timestamp: datetime
    content: str
    conversation_id: int


class MessageRepository:
    def get_all(self, conversation_id: int) -> List[MessageOut]:
        # try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                        SELECT 
                          id
                        , sender
                        , recipient
                        , timestamp
                        , content
                        , conversation_id
                        FROM messages
                        WHERE conversation_id = %s;
                        """,
                    [conversation_id],
                )

                result = [
                    MessageOut(
                        id=record[0],
                        sender=record[1],
                        recipient=record[2],
                        timestamp=record[3],
                        content=record[4],
                        conversation_id=record[5],
                    )
                    for record in db
                ]
                print(result)
                return result

    def get_one(self, message_id: int) -> MessageOut:
        # try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                message = db.execute(
                    """
                        SELECT * 
                        FROM messages
                        WHERE id = %s
                        """,
                    [message_id],
                )
                record = message.fetchone()

                result = MessageOut(
                    id=record[0],
                    sender=record[1],
                    recipient=record[2],
                    timestamp=record[3],
                    content=record[4],
                    conversation_id=record[6],
                )

                return result

    def create(self, message: MessageIn) -> MessageOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                INSERT INTO messages (
                      sender
                    , recipient
                    , timestamp
                    , content
                    , conversation_id
                ) VALUES (%s, %s, %s, %s, %s)
                RETURNING id;

                """,
                    [
                        message.sender,
                        message.recipient,
                        message.timestamp,
                        message.content,
                        message.conversation_id,
                    ],
                )
                id = result.fetchone()[0]

                old_data = message.dict()
                return MessageOut(id=id, **old_data)

    def delete(self, message_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM messages
                        WHERE id = %s;
                        """,
                        [message_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False
