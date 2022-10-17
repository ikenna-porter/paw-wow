import React from 'react';
import { useState, useEffect } from 'react';

export default function ListFriends(props) {
    const [friends, setFriends] = useState([])
    useEffect(() => {
        // how do I pass in User_One
        fetch("http://localhost:8100/api/friendships/{user_one}")
        .then(res => res.json())
        .then(data => {setFriends(data.friends);
        console.log(data)})
    }, [])
  



return(
    <div className='container my-5'>
0    <h2>Friend List</h2>
    <table className='table'>
        {/* maketh the table */}
        <tbody>
             {/* {friends.filter} */}
        </tbody>
    </table>
    </div>
);

}


// return the list