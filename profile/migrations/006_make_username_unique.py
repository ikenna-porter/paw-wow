steps = [
    [
        """
        ALTER TABLE accounts
        DROP COLUMN username;
        """,
        """
        ALTER TABLE accounts
        ADD username VARCHAR(50) NOT NULL;
        """
    ],
    [
        """
        ALTER TABLE accounts
        ADD username VARCHAR(50) NOT NULL UNIQUE;
        """,
        """
        ALTER TABLE accounts
        DROP COLUMN username;
        """
    ]
]