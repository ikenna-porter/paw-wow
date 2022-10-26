import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom';

function PendingList() {
  const [ pending_friends, setPending ] = useState([]);
  const user_two = localStorage.getItem('profileId');
  const navigate = useNavigate();

  useEffect(() => {
      async function getPendingData() {
          const url = `http://localhost:8100/api/friendships/${user_two}/pending`;
          const response = await fetch(url);
          if (response.ok) {
              const data = await response.json();
              setPending(data);
          } else {
              console.log('Could not get pending friend requests.');
          }
      } getPendingData();
  }, [user_two])

  const handleAccept = async (e) => {
      const user_one = e.target.value;
      const acceptUrl = `http://localhost:8100/api/friendships/${user_one}/pending`;
      const fetchConfig = {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          }
      };
      const acceptResponse = await fetch(acceptUrl, fetchConfig);
      if (acceptResponse.ok) {
          setPending(
              pending_friends.filter(pending => pending.user_one != user_one)
          );
      }
  }

  const handleDeny = async (e) => {
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
          setPending(
              pending_friends.filter(pending => pending.user_one != user_one)
          );
      }
  }

  const handleConnect = (e) => {
    e.preventDefault();
    navigate(`/profile/${e.target.value}`);
  }

  return (
  <>
  <div className='pt-5 text-center'>
    <h2 className='pb-3'>Your Pending Pals</h2>
    <div className='container row-cols-1 row-cols-md-3 g-4 text-center'>
    {
      pending_friends.map((pending, idx) => {
        return ( 
          <div key={idx} className="container text-center">
            <div className='container text-center'>
              <div className='card shadow-sm text-center'>
                <div className='card-header bg-transparent text-center'>
                  <h4>{pending.dog_name}<small className='text-muted'> wants to be your furiend!</small></h4>
                </div>
                <div className='text-center pt-2'>
                  <Button className="btn-light form-btn" value={pending.user_one} onClick={handleConnect}>View Profile</Button>
                </div>
                <div className='text-center p-2'>
                  {
                    pending.image ?
                    <img className='profile-pic' src={pending.image}/>
                    :
                    <img className='profile-pic' src={require('../Images/dogoutline.png')}/>
                  }
                  <div>
                  <p>{pending.city}, {pending.state}</p>
                  </div>
                  <div>
                    <ButtonGroup aria-label="Basic example">
                      <Button variant="outline-success" onClick={handleAccept} value={pending.user_one}>Accept</Button>
                      <Button variant="outline-danger" onClick={handleDeny} value={pending.user_one}>Deny</Button>
                    </ButtonGroup>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })
    }
    </div>
    {pending_friends < 1 ? <p>No pending requests.</p> : null}
    </div>
  </>
  )
}

export default PendingList;