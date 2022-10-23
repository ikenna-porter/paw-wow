steps = [ 
    [ 
        """
        ALTER TABLE profile_pictures
        ALTER COLUMN image TYPE text;
        """,
        """
        ALTER TABLE profile_pictures
        ALTER COLUMN bytea;
        """
    ]
]