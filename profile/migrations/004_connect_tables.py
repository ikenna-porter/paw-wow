steps = [
    [
        """
        ALTER TABLE characteristics
        ADD profile_id INTEGER REFERENCES profile("id") ON DELETE CASCADE;
        """,
        """
        ALTER TABLE characteristics
        DROP COLUMN profile_id;
        """
    ],
    [
        """
        ALTER TABLE vaccination_records
        ADD profile_id INTEGER REFERENCES profile("id") ON DELETE CASCADE;
        """,
        """
        ALTER TABLE vaccination_records
        DROP COLUMN profile_id;
        """
    ]
]