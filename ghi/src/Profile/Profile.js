import { useState, useEffect } from 'react';
import Vaccinations from './Vaccinations';
import Characteristics from './Characteristics';
import CharsModal from './CharacteristicsModal';
import EditProfileModal from './EditProfileModal';
import ProfilePicModal from './ProfilePicModal';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Profile() {
    const [ hasChars, setHasChars ] = useState(false);
    const [ hasPic, setHasPic ] = useState(false);
    const [ showChars, setShowChars ] = useState(false);
    const [ showProfile, setShowProfile ] = useState(false);
    const [ showPic, setShowPic ] = useState(false);
    const [ profilePic, setProfilePic ] = useState('');
    const handleShowChars = () => setShowChars(true);
    const handleCloseChars = () => setShowChars(false);
    const handleShowProf = () => setShowProfile(true);
    const handleCloseProf = () => setShowProfile(false);
    const handleShowPic = () => setShowPic(true);
    const handleClosePic = () => setShowPic(false);
    const [ profile, setProfile ] = useState({
        id: '',
        dog_name: '',
        owner_name: '',
        owner_description: '',
        city: '',
        state: ''
    })
    const [ chars, setChars ] = useState([
        {char: 'dog friendly', value: 1},
        {char: 'kid friendly', value: 1},
        {char: 'people friendly', value: 1},
        {char: 'energy level', value: 1}
    ]);
    const [ dogDetails, setDogDetails ] = useState({
        DOB: '',
        fixed: false,
        size: '',
        breed: '',
        gender: '',
        dog_bio: ''
    })
    const profileId = localStorage.getItem('profileId')
    const username = localStorage.getItem('currentUser')

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
    
    async function getChars(profileId) {
            const charsResponse = await fetch(
                `http://localhost:8100/api/characteristics/${profileId}`,
                {credentials: 'include'}
            )

            if (charsResponse.ok) {
                const charsData = await charsResponse.json();
                if (Object.keys(charsData).length > 1) {
                    setHasChars(true);
                    setChars([
                        {char: 'dog friendly', value: charsData.dog_friendly},
                        {char: 'kid friendly', value: charsData.kid_friendly},
                        {char: 'people friendly', value: charsData.people_friendly},
                        {char: 'energy level', value: charsData.energy_level}
                    ]);
                    setDogDetails({
                        DOB: charsData.DOB,
                        fixed: charsData.fixed,
                        size: charsData.size,
                        breed: charsData.breed,
                        gender: charsData.gender,
                        dog_bio: charsData.dog_bio
                    });
                }
            }
    }

    async function getProfile() {
        const profileResponse = await fetch(
            `http://localhost:8100/api/profiles/${username}`,
            {credentials: 'include'}
        )
        if (profileResponse.ok) {
            const data = await profileResponse.json();
            setProfile({...data});
            localStorage.setItem('profileId', `${data.id}`)
            getChars(profileId);
            getProfilePic(profileId);
        }
    }

    async function getProfilePic(profileId) {
        const url = `http://localhost:8100/api/profile-pic/${profileId}`;
        const response = await fetch(url, {credentials: 'include'});
        if (response.ok) {
            const profilePicData = await response.json();
            if (Object.keys(profilePicData).length > 1) {
                setProfilePic(profilePicData.URI);
                setHasPic(true);
            }
        }
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
                'user_one': Number(id),
                'user_two': 4
            })
        };
        const reqResponse = await fetch(requestUrl, fetchConfig);
        if (reqResponse.ok) {
            console.log(reqResponse);
        }
        console.log("THE BUTTON WAS PRESSED")
    }

    useEffect(() => {
        getProfile();
    }, [profile.dog_name])
    
    if (!profile.dog_name) {
        return(
            <>Loading Profile</>
        )
    }


  return(
  <Container className="dog-container dog-profile py-4">
    <Row className="profile-div row">
      <Col className='dog-profile-img'>
        <div className='profile-div'>
          {
            profile.id != profileId
            ?
            <button className="profile-btn" onClick={handleAdd} value={profile.id}> Add Me </button>
            :
            <Link to='/profile/friends'><button className="profile-btn"> Friends List </button>
            </Link>
          }
        </div>
          <ProfilePicModal
              hasPic={hasPic}
              handleClose={handleClosePic}
              show={showPic}
              getProfilePic={getProfilePic}
          />
          <img
              className="profile-pic" 
              src={profilePic}
              alt='Standard Dog Image'
          />
          <h2 className='name'>{profile.dog_name}</h2>
          { hasPic
              ?
                <button className="profile-btn" onClick={handleShowPic}>
                    Update Picture 
                </button> 
              : 
                <button className="profile-btn" onClick={handleShowPic}>
                  Upload Picture
              </button>
          }
      </Col>
      <Col className='bio'>
      <div className="bio">
        <h4 className='title'>{profile.dog_name}'s Bio</h4>
        <p className="mb-0"><strong className="pr-1">I am a: </strong>{dogDetails.size} {dogDetails.breed}</p>
        <p className="mb-0"><strong className="pr-1">My gender: </strong>{dogDetails.gender}</p>
        <p className="mb-0"><strong className="pr-1">My age: </strong>{calculateAge(dogDetails.DOB)}</p>
        { dogDetails.fixed
            ? <p className="mb-0"><strong className="pr-1">I am fixed</strong></p>
            : <p className="mb-0"><strong className="pr-1">I am not fixed</strong></p>
        }
        <p className="mb-0"><strong className="pr-1">More about me: </strong>{dogDetails.dog_bio}</p>
      </div>  
      <div className="chars">
        <h4 className="title">Characteristics</h4> 
        { hasChars
          ? 
          <div className='chars'>
            <Characteristics chars={chars} />
            <button className="profile-btn" onClick={handleShowChars}>
                Update {profile.dog_name}'s Info'
            </button> 
          </div>
          : <button className="profile-btn" onClick={handleShowChars}>
            Add info for {profile.dog_name}
          </button>
        }    
      </div>  
        <CharsModal
            show={showChars} 
            handleClose={handleCloseChars} 
            dogName={profile.dog_name}
            chars={chars}
            dogDetails={dogDetails}
            getChars={getChars}
            hasChars={hasChars}
        />
        <EditProfileModal
            show={showProfile}
            handleClose={handleCloseProf}
            dogName={profile.dog_name}
            getProfile={getProfile}
            profile={profile}
            username={username}
        />
        </Col>
        </Row>
        <Row className='profile-div row'>
        <Col className='secondary-bio'>
          <Vaccinations dogName ={profile.dog_name} />
        </Col> 
        </Row>
        <Row className='profile-div row'>
          <Col className="secondary-bio">   
            <div className="card-body">
              <h4 className='title'>{profile.owner_name}'s Bio</h4>
              <button className="profile-btn" onClick={handleShowProf}>
                  Edit Profile
              </button>
              <p className="mb-0"><strong className="pr-1">My human is: </strong>{profile.owner_name}</p>
              <p className="mb-0"><strong className="pr-1">{profile.owner_name} and I live in: </strong>{profile.city}, {profile.state}</p>
              <p className="mb-0"><strong className="pr-1">More about my human: </strong>{profile.owner_description}</p>
            </div>
          </Col>    
      </Row>
  </Container>
  )
}