import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';

export default function OtherProfile() {
    const [profile, setProfile] = useState({});
    const currentUser = localStorage.getItem('profileId');
    const {id} = useParams();
    const [ friends, setFriends ] = useState([]);
    const [ pendingFriends, setPendingFriends ] = useState([]);


    function charEnergy(charE) {
        const rateForEnergy = {
            1: "I am a couch potato",
            2: "I am pretty chill",
            3: "I can go for some play",
            4: "I love to run and play",
            5: "I have infinite energy!"
        }
        return rateForEnergy[charE]
    }

    function charOthers(charO) {
        const rateForOthers = {
            1: "They are not my favorite",
            2: "I am shy around them",
            3: "I do not have much experience with them",
            4: "I like them!",
            5: "I LOVE them!"
        }
        return rateForOthers[charO]
    }

    function calculateAge(DOB) {
        if (DOB) {
            let arr = DOB.split('-')
            let newDOB = arr.map(num => parseInt(num))
            let y = newDOB[0]
            let m = newDOB[1]
            const date = new Date()
            let ageY = date.getFullYear() - y
            let ageM = (date.getMonth() + 1) - m

            if (ageM === 0) {
                return `${ageY} years`
            } else if (ageM < 0) {
                return `${ageY - 1} years, ${12+ageM} months`
            } else if (ageM > 0) {
                return `${ageY} years, ${ageM} months`
            }
        }
    }
    
    async function getPending() {
      const url = `http://localhost:8100/api/friendships/${id}/pending`;
      const pendingResponse = await fetch(url);
      if(pendingResponse.ok) {
        const pendingData = await pendingResponse.json();
        setPendingFriends(pendingData)
        console.log('PENDING HERE', pendingData)
      }
    }  
    useEffect(() => {
        async function getProfile() {
            const url = `http://localhost:8100/api/profile/${id}`;
            const response = await fetch(url)
            if(response.ok) {
                const data = await response.json();
                setProfile(data);
                };
        } getProfile()
        async function getFriendship() {
          const url = `http://localhost:8100/api/friendships/${currentUser}`;
          const friendResponse = await fetch(url);
          if(friendResponse.ok) {
            const friendData = await friendResponse.json();
            setFriends(friendData)
          }
        } getFriendship();
        getPending();
    }, [id])


    function checkFriends(otherProfileId) {
      for (let friend of friends) {
        console.log('FRIENDS', friends)
        if (String(friend.id) === otherProfileId) {
          return true;
        }
      } return false;
    }

    function checkPending(currentUser) {
      for (let pending of pendingFriends) {
        if (String(pending.user_one) === currentUser) {
          return true;
        }
      } return false;
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        const id = e.target.value;
        console.log(e.target)
        const requestUrl = `http://localhost:8100/api/friendships/${id}`;
        const fetchConfig = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify( {
                'status': 0,
                'user_one': Number(currentUser),
                'user_two': Number(id)
            })
        };
        const reqResponse = await fetch(requestUrl, fetchConfig);
        if (reqResponse.ok) {
          getPending();
          checkPending(currentUser);
        }
    }

    if (!profile.dog_name) {
        return(
            <>Loading Profile</>
        )
    }


  return(
    <div className="container">
      <div className="dog-profile py-4">
        <div className="profile-div row">
          <div className="col-lg-4">
            <div className='container p-3'>
            </div>
            <div className="pb-3">
              {
                checkFriends(id) ?
                <Button className='disabled'>Friends</Button>
                :
                checkPending(currentUser) ?
                <Button className='disabled btn-light'>Pending</Button>
                :
                <Button className="btn btn-light form-btn btn-sm" value={profile.id} onClick={handleAdd}>
                    Add {profile.dog_name}
                </Button>
              }
            </div>
            <div className="card shadow-sm">
              <div className="card-header bg-transparent text-center">
                {
                  profile.image ?
                  <img className="dog_img" src={profile.image} alt='Standard Dog Image'/>
                  :
                  <img className='profile-pic' src={require('../Images/dogoutline.png')}/>
                }
                <h2>{profile.dog_name}</h2>
              </div>
              <div className="card-header bg-transparent card-body">
                <h5>{profile.dog_name}'s Bio</h5>
                <p className="mb-0"><strong className="pr-1">I am a: </strong>{profile.size} {profile.breed}</p>
                <p className="mb-0"><strong className="pr-1">My gender: </strong>{profile.gender}</p>
                <p className="mb-0"><strong className="pr-1">My age: </strong>{calculateAge(profile.DOB)}</p>
                { profile.fixed
                    ? <p className="mb-0"><strong className="pr-1">I am fixed</strong></p>
                    : <p className="mb-0"><strong className="pr-1">I am not fixed</strong></p>
                }
                <p className="mb-0"><strong className="pr-1">More about me: </strong>{profile.dog_bio}</p>
              </div>  
              <div className="card-body">
                <h5 className="card-title">Characteristics</h5> 
                    <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Characteristic</th>
                        <th>Rating</th>
                        <th>How I feel</th>
                    </tr>
                </thead>    
                <tbody>
                            <tr>
                                <td>Dog Friendly</td>
                                <td>{profile.dog_friendly}</td>
                                <td>{charOthers(profile.dog_friendly)}</td>
                            </tr>
                            <tr>
                                <td>Kid Friendly</td>
                                <td>{profile.kid_friendly}</td>
                                <td>{charOthers(profile.kid_friendly)}</td>
                            </tr>
                            <tr>
                                <td>People Friendly</td>
                                <td>{profile.people_friendly}</td>
                                <td>{charOthers(profile.people_friendly)}</td>
                            </tr>
                            <tr>
                                <td>Energy Level</td>
                                <td>{profile.energy_level}</td>
                                <td>{charEnergy(profile.energy_level)}</td>
                            </tr>
                </tbody>
            </table>
              </div>
            </div>    
                <div className="card">   
                  <div className="card-body">
                    <h5>{profile.owner_name}'s Bio</h5>
                    <p className="mb-0"><strong className="pr-1">My human is: </strong>{profile.owner_name}</p>
                    <p className="mb-0"><strong className="pr-1">{profile.owner_name} and I live in: </strong>{profile.city}, {profile.state}</p>
                    <p className="mb-0"><strong className="pr-1">More about my human: </strong>{profile.owner_description}</p>
                  </div>
                </div>
                <div className="card">
                <div className="card-body">
                <h5 className="card-title">Vaccinations</h5> 
                    <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Distemper</th>
                                <th>Parvo</th>
                                <th>Adeno</th>
                                <th>Rabies</th>
                                <th>Other</th>
                            </tr>
                        </thead>
                    <tbody>
                        <tr>
                            <td>{String(profile.distemper)}</td>
                            <td>{String(profile.parvo)}</td>
                            <td>{String(profile.adeno)}</td>
                            <td>{String(profile.rabies)}</td>
                            <td>{String(profile.other)}</td>
                        </tr>
                    </tbody>
                    </table>
                    </div>
              </div>
            </div>   
              </div>    
            </div>      
          </div>
        </div>
  )
}
