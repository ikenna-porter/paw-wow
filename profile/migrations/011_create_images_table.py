steps = [ 
    [ 
        """
        ALTER TABLE profiles
        DROP COLUMN avatar; 
        """,

        """
        ALTER TABLE profiles
        ADD COLUMN avatar TEXT;
        """
    ],
    [ 
        """
        CREATE TABLE profile_pictures (
            id SERIAL PRIMARY KEY NOT NULL,
            image_name TEXT,
            image BYTEA,
            profile_id INTEGER UNIQUE REFERENCES profiles("id") ON DELETE CASCADE
        );
        """,

        """
        DESTROY TABLE profile_pictures
        """
    ],
    [ 
        """
        ALTER TABLE profiles
        DROP COLUMN account_id;
        """,

        """
        ALTER TABLE profiles
        ADD COLUMN account_id INTEGER REFERENCES accounts("id") ON DELETE CASCADE;
        """
    ],
    [ 
        """
        ALTER TABLE profiles
        ADD COLUMN account_id INTEGER UNIQUE REFERENCES accounts("id") ON DELETE CASCADE;
        """,
        
        """
        ALTER TABLE profiles
        DROP COLUMN account_id;
        """
    ]
]