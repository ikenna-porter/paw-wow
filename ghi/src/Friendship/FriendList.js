import React from 'react';
import { useState, useEffect } from 'react';

export default function ListFriends(props) {
    const [friends, setFriends] = useState([]);
    const user_one = 2
    // fix the hard coded user id

    useEffect(() => {
        async function getFriendList() {
            const url = `http://localhost:8100/api/friendships/${user_one}`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setFriends(data);
                console.log('PRINTING',data)
            }else{
                console.log("ERROR!");
            }
            } getFriendList()
        }, [setFriends, user_one])
  



return(
    <div className='container my-5'>
    <h2>Friend List</h2>
    <div>
        {friends.map(friend => {
            return (
                <div className='container'>
                <div className='row col-lg-4'>
                    <div className='card shadow-sm'>
                        <div className='card-header bg-transparent text-center'>
                            {friend.user_two}
                        </div>
                    </div>
                </div>
                </div>
            )
        })}
    </div>
    </div>
);

}


// return the list