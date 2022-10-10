steps = [
    [
        """
        ALTER TABLE characteristics
        DROP COLUMN profile_id;
        """,
        """
        ALTER TABLE characteristics
        ADD profile_id INTEGER NOT NULL REFERENCES profile("id") ON DELETE CASCADE;;
        """
    ],
    [
        """
        ALTER TABLE characteristics
        ADD profile_id INTEGER NOT NULL REFERENCES profiles("id") ON DELETE CASCADE;
        """,
        """
        ALTER TABLE characteristics
        DROP COLUMN profile_id;
        """
    ],
    [
        """
        ALTER TABLE vaccination_records
        DROP COLUMN profile_id;
        """,
        """
        ALTER TABLE vaccination_records
        ADD profile_id INTEGER NOT NULL REFERENCES profile("id") ON DELETE CASCADE;;
        """
    ],
    [
        """
        ALTER TABLE vaccination_records
        ADD profile_id INTEGER NOT NULL REFERENCES profiles("id") ON DELETE CASCADE;
        """,
        """
        ALTER TABLE characteristics
        DROP COLUMN profile_id;
        """
    ]
]