steps = [
    [
        """
        ALTER TABLE profiles
        DROP COLUMN account_id;
        """,
        """
        ALTER TABLE profiles
        ADD account_id INTEGER REFERENCES accounts("id") ON DELETE CASCADE;;
        """
    ],
    [
        """
        ALTER TABLE profiles
        ADD account_id INTEGER NOT NULL REFERENCES accounts("id") ON DELETE CASCADE;
        """,
        """
        ALTER TABLE profiles
        DROP COLUMN account_id;
        """
    ]
]