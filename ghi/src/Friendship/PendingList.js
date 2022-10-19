import React from 'react';
import { useState, useEffect, newState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function PendingList(props) {
    const [pending_friends, setPending] = useState([]);
    const [error, setError] = useState('');
    const user_two = 5
    // fix the hard coded user id

    useEffect(() => {
        async function getPendingData() {
            const url = `http://localhost:8100/api/friendships/${user_two}/pending`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setPending(data);
                console.log('PRINTING',data)
            } else {
                setError('Could not get pending friend requests');
            }
        } getPendingData()
    }, [setPending, setError, user_two])

    const handleAccept = async (e) => {
        const id = e.target.value;
        const acceptUrl = `http://localhost:8100/api/friendships/${id}/pending`;
        const fetchConfig = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const acceptResponse = await fetch(acceptUrl, fetchConfig);
        if (acceptResponse.ok) {
            setPending(
                pending_friends.filter(pending => pending.id != id)
            )
        }
    }

    const handleDeny = async (e) => {
        const id = e.target.value;
        const pendingUrl = `http://localhost:8100/api/friendships/${id}/pending`;
        const fetchConfig = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const pendingResponse = await fetch(pendingUrl, fetchConfig);
        if (pendingResponse.ok) {
            setPending(
                pending_friends.filter(pending => pending.id != id)
            )
        }
    }

    console.log('PENDING', pending_friends)
    return (
        <>
        {pending_friends.map((pending, idx) => {
            return ( 
                <div key={idx} className="container fluid-sm mt-4">
                <div className='row col-lg-4'>
                    <div className='card shadow-sm'>
                        <div className='card-header bg-transparent text-center'>
                            <h4>{pending.dog_name}<small className='text-muted'> wants to be your furiend!</small></h4>
                        </div>
                        <div className='text-center p-2'>
                        <ButtonGroup aria-label="Basic example">
                        <Button variant="outline-success" onClick={handleAccept} value={pending.id}>Accept</Button>
                        <Button variant="outline-danger" onClick={handleDeny} value={pending.id}>Deny</Button>
                        </ButtonGroup>
                        </div>
                    </div>
                </div>
            </div>
            )
        })}
        </>
    )
}

export default PendingList;