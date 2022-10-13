steps = [
    [
        ## Create a user value object table
        """
        CREATE TABLE user_vos (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            picture_url VARCHAR(300),
            profile_id INTEGER NOT NULL,
            profile_url VARCHAR(300)
        );
        """,

        ## Destroy a user value object table
        """
        DESTROY TABLE user_vos;
        """
    ],
    [
        ## Create a conversations table
        """
        CREATE TABLE conversations (
            id SERIAL PRIMARY KEY NOT NULL,
            primary_user INTEGER REFERENCES user_vos(id),
            other_user INTEGER REFERENCES user_vos(id),
            read BOOL DEFAULT FALSE,
            unseen_message_count INTEGER,
            last_message TEXT
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
            sender INTEGER NOT NULL REFERENCES user_vos(id) ON DELETE CASCADE,
            recipient INTEGER NOT NULL REFERENCES user_vos(id) ON DELETE CASCADE,
            timestamp TIMESTAMP NOT NULL,
            content TEXT NOT NULL,
            read BOOL NOT NULL DEFAULT False,
            conversation_id INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE
        );
        """,

        ## Destroy an messages table
        """
        DESTROY TABLE messages;
        """
    ],
]