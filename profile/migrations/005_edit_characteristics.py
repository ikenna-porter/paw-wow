steps = [
    [
        """
        ALTER TABLE characteristics 
        DROP COLUMN playfulness;
        """,
        """
        ALTER TABLE characteristics
        ADD playfulness SMALLINT NOT NULL;
        """
    ],
    [
        """
        ALTER TABLE characteristics
        ADD fixed BOOL NOT NULL;
        """,
        """
        ALTER TABLE characteristics
        DROP COLUMN fixed;
        """
    ],
    [
        """
        ALTER TABLE characteristics
        ADD size TEXT NOT NULL check(size = 'Small' or size = 'Medium' or size = 'Large');
        """,
        """
        ALTER TABLE characteristics
        DROP COLUMN size;
        """
    ],
    [
        """
        ALTER TABLE characteristics
        DROP COLUMN profile_id;
        """,
        """
        ALTER TABLE characteristics
        ADD profile_id INTEGER REFERENCES profile("id") ON DELETE CASCADE;
        """
    ],
    [
        """
        ALTER TABLE vaccination_records
        DROP COLUMN profile_id;
        """,
        """
        ALTER TABLE vaccination_records
        ADD profile_id INTEGER REFERENCES profile("id") ON DELETE CASCADE;
        """
    ],
    [
        """
        ALTER TABLE characteristics
        ADD profile_id INTEGER NOT NULL REFERENCES profile("id") ON DELETE CASCADE;
        """,
        """
        ALTER TABLE characteristics
        DROP COLUMN profile_id;
        """
    ],
    [
        """
        ALTER TABLE vaccination_records
        ADD profile_id INTEGER NOT NULL REFERENCES profile("id") ON DELETE CASCADE;
        """,
        """
        ALTER TABLE vaccination_records
        DROP COLUMN profile_id;
        """
    ]
]