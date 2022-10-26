steps = [
    [
        ## Create a conversations table
        """
        CREATE TABLE conversations (
            id SERIAL PRIMARY KEY NOT NULL,
            primary_user INTEGER REFERENCES profiles(id),
            other_user INTEGER REFERENCES profiles(id)
        );
        """,

        ## Destroy a conversations table
        """
        DROP TABLE conversations;
        """
    ],
    [
        ## Create an messages table
        """
        CREATE TABLE messages (
            id SERIAL PRIMARY KEY NOT NULL,
            sender INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
            recipient INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
            timestamp TIMESTAMP NOT NULL,
            content TEXT NOT NULL,
            conversation_id INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE
        );
        """,

        ## Destroy an messages table
        """
        DESTROY TABLE messages;
        """
    ],
]