import React from 'react';
import { useState, useEffect } from 'react';

function PendingList(props) {
    const [pending, setPending] = useState([]);
    const [error, setError] = useState('');
    const user_two = 5
    // fix the hard coded user id

    useEffect(() => {
        async function getPendingData() {
            const url = `http://localhost:8100/api/friendships/${user_two}/pending`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setPending(...data);
                console.log('PRINTING',data)
            } else {
                setError('Could not get pending friend requests');
            }
        } getPendingData()
    }, [setPending, setError, user_two])

    return (
        <>
        <div>
            Hello!
        </div>
        </>
    )
}

export default PendingList;