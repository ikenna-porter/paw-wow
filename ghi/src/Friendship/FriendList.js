import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

export default function ListFriends(props) {
    const [friends, setFriends] = useState([]);
    const id = 29
    // fix hard coding id

    useEffect(() => {
        async function getFriendList() {
            const url = `http://localhost:8100/api/friendships/${id}`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setFriends(data);
                console.log('PRINTING',data)
            } else {
                console.log("ERROR!");
            }
            } getFriendList()
        }, [setFriends, id])


return(
    <div className='container my-5'>
    <h2>Your Paw Pals</h2>
    <div className='text-center'>
        {friends.map((friend, idx) => {
            return (
                <div key={idx} className='container'>
                <div className='row col-lg-4 text-center'>
                    <div className='card shadow-sm text-center'>
                        <div className='card-header bg-transparent text-center'>
                            {friend}
                        </div>
                    </div>
                </div>
                </div>
            )
        })}
    </div>
    <div>
    <Button variant='outline-primary' href='http://localhost:3000/profile/pending'> Pending Requests </Button>
    </div>
    </div>
);

}
