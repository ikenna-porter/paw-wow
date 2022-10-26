import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function ListFriends(props) {
    const [friends, setFriends] = useState([]);
    const id = localStorage.getItem('profileId')
    const navigate = useNavigate();

    useEffect(() => {
        async function getFriendList() {
            const url = `http://localhost:8100/api/friendships/${id}`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setFriends(data);
            } else {
                console.log("Could not get friends list.");
            }
            } getFriendList()
        }, [setFriends, id])

        const handleView = (e) => {
            e.preventDefault();
            navigate(`/profile/${e.target.value}`)
        }

        const handleDelete = async (e) => {
            const user_one = e.target.value;
            const pendingUrl = `http://localhost:8100/api/friendships/${user_one}/pending`;
            const fetchConfig = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const pendingResponse = await fetch(pendingUrl, fetchConfig);
            if (pendingResponse.ok) {
                setFriends(
                    friends.filter(friend => friend.id != user_one)
                )
            }
        }

return(
    <div className='container pt-5 text-center'>
    <h2>Your Paw Pals</h2>
    <div className='text-center'>
        {friends.length > 0 ?
            friends.map((friend, idx) => {
                return (
                    <div key={idx} className='container'>
                    <div className='row col-lg-4 text-center'>
                        <div className='card shadow-sm text-center'>
                            <div className='card-header bg-transparent text-center'>
                                <h4>{friend.dog_name}</h4>
                                {
                                    friend.image ?
                                    <img className='profile-pic' src={friend.image}/>
                                    :
                                    <img className='profile-pic' src={require('../Images/dogoutline.png')}/>
                                }
                                <p>{friend.city}, {friend.state}</p>
                                <Button className="btn-light form-btn" value={friend.id} onClick={handleView}>View Profile</Button> 
                                <Button className="btn-light close-btn" value={friend.id} onClick={handleDelete}>Remove Friend</Button>
                            </div>
                        </div>
                    </div>
                    </div>
                )
            })
            :
            <p>You have no friends.</p>
        }
    </div>
    <div>
    <Button className="btn-light close-btn" href='http://localhost:3000/profile/pending'> Pending Requests </Button>
    </div>
    </div>
);

}
