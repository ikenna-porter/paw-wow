steps = [
    [
        ## Create an account table
        """
        CREATE TABLE account (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(50) NOT NULL,
            password VARCHAR(100) NOT NULL
        );
        """,

        ## Destroy an account table
        """
        DESTROY TABLE account;
        """
    ],
    [
        ## Create a profile table
        """
        CREATE TABLE profile (
            id SERIAL PRIMARY KEY NOT NULL,
            dog_name VARCHAR(50) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(2) NOT NULL,
            account_id INTEGER REFERENCES account("id") ON DELETE CASCADE,
            owner_name VARCHAR(50),
            owner_description TEXT,
            avatar TEXT
        );
        """,

        ## Destroy a profile table
        """
        DROP TABLE profile;
        """
    ]
]