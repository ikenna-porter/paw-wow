steps = [ 
    [ 
        """
        ALTER TABLE profiles
        ADD social_media VARCHAR(100); 
        """,
        """
        ALTER TABLE profiles
        DROP COLUMN social_media;
        """
    ]
]