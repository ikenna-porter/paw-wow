steps = [
        [
        """
        ALTER TABLE followers
        DROP COLUMN follower;
        """,

        """
        ALTER TABLE followers
        ADD COLUMN follower INTEGER REFERENCES profiles("id") PRIMARY KEY NOT NULL;
        """
    ],
    [
        """
        ALTER TABLE followers
        ADD COLUMN id SERIAL PRIMARY KEY NOT NULL;
        """,

        """
        ALTER TABLE followers
        DROP COLUMN id;
        """
    ],
    [
        """
        ALTER TABLE followers
        ADD COLUMN follower INTEGER REFERENCES profiles("id") NOT NULL;
        """,

        """
        ALTER TABLE followers
        DROP COLUMN follower;
        """
    ]
]