import { useState, useEffect } from 'react'
import Vaccinations from './Vaccinations';
import Characteristics from './Characteristics';
import CharsModal from './CharacteristicsModal';
import Button from 'react-bootstrap/Button';
import EditProfileModal from './EditProfileModal';
import ProfilePicModal from './ProfilePicModal';
import ListFriends from '../Friendship/FriendList';
import { useNavigate } from "react-router-dom";

export default function Profile(props) {
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
    const navigate = useNavigate();
    // This id is hard coded until I put this in local storage
    // If you want to try this out create an account and profile and insert that profile's id and username here
    const [profileId, setProfileId] = useState(null);
    const username = props.currentUser


    function calculateAge(DOB) {
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
    
    async function getChars(profileId) {
            const charsResponse = await fetch(`http://localhost:8100/api/characteristics/${profileId}`)
            if (charsResponse.ok) {
                const charsData = await charsResponse.json();
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

    async function getProfile() {
        const profileResponse = await fetch(`http://localhost:8100/api/profiles/${username}`)
        if (profileResponse.ok) {
            const data = await profileResponse.json();
            setProfile({...data});
            setProfileId(data.id)
            getChars(data.id);
            getProfilePic(data.id);
        }
    }

    async function getProfilePic(profileId) {
        const url = `http://localhost:8100/api/profile-pic/${profileId}`;
        const response = await fetch(url, {credentials: 'include'});
        if (response.ok) {
            const profilePicData = await response.json();
            console.log(profilePicData);
            setProfilePic(profilePicData.URI);
            setHasPic(true);
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
                'user_two': 5
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
        <div className="dog-profile py-4">
            <div className="container">
                <div className="row">
                <div className="col-lg-4">
                    <div className='container p-3'>
                            {
                                profile.id != profileId
                                ?
                                <Button size='md' onClick={handleAdd} value={profile.id}> ADD ME </Button>
                                :
                                <Button size='md'> Friends List </Button>
                            }
                    </div>
                    <div className="card shadow-sm">
                    <div className="card-header bg-transparent text-center">
                        <ProfilePicModal
                            hasPic={hasPic}
                            profileId={profileId} 
                            handleClose={handleClosePic}
                            show={showPic}
                            getProfilePic={getProfilePic}
                        />
                        <img
                            className="dog_img" 
                            src={profilePic}
                            alt='Standard Dog Image'
                        />
                        <h2>{profile.dog_name}</h2>
                        { hasPic
                            ? <div>
                                <Button className="btn btn-info btn-sm" onClick={handleShowPic}>
                                    Edit Profile Picture for {profile.dog_name}
                                </Button> 
                            </div>
                            : <Button className="btn btn-info btn-sm" onClick={handleShowPic}>
                                Add Profile Picture for {profile.dog_name}
                            </Button>
                        }
                    </div>
                    <div className="card-header bg-transparent card-body">
                        <h5>{profile.dog_name}'s Bio</h5>
                        <p className="mb-0"><strong className="pr-1">I am a: </strong>{dogDetails.size} {dogDetails.breed}</p>
                        <p className="mb-0"><strong className="pr-1">My gender: </strong>{dogDetails.gender}</p>
                        <p className="mb-0"><strong className="pr-1">My age: </strong>{calculateAge(dogDetails.DOB)}</p>
                        { dogDetails.fixed
                            ? <p className="mb-0"><strong className="pr-1">I am fixed</strong></p>
                            : <p className="mb-0"><strong className="pr-1">I am not fixed</strong></p>
                        }
                        <p className="mb-0"><strong className="pr-1">More about me: </strong>{dogDetails.dog_bio}</p>
                    </div>  
                    <div className="card-body">
                        <h5 className="card-title">Characteristics</h5> 
                        { hasChars
                            ? <div>
                                <Characteristics chars={chars} />
                                <Button className="btn btn-info btn-sm" onClick={handleShowChars}>
                                    Edit Characteristics for {profile.dog_name}
                                </Button> 
                            </div>
                            : <Button className="btn btn-info btn-sm" onClick={handleShowChars}>
                                Add more information for {profile.dog_name}
                            </Button>
                        }    
                    </div>
                </div>    
                    <CharsModal
                        show={showChars} 
                        handleClose={handleCloseChars} 
                        profileId={profileId} 
                        dogName={profile.dog_name}
                        chars={chars}
                        dogDetails={dogDetails}
                        getChars={getChars}
                        hasChars={hasChars}
                    />
                    <EditProfileModal
                        show={showProfile}
                        handleClose={handleCloseProf}
                        profileId={profileId}
                        dogName={profile.dog_name}
                        getProfile={getProfile}
                        profile={profile}
                        username={username}
                    />
                    <div className="card">   
                        <div className="card-body">
                            <h5>{profile.owner_name}'s Bio</h5>
                            <Button className="btn btn-info btn-sm mb-2" onClick={handleShowProf}>
                                Edit Profile
                            </Button>
                            <p className="mb-0"><strong className="pr-1">My human is: </strong>{profile.owner_name}</p>
                            <p className="mb-0"><strong className="pr-1">{profile.owner_name} and I live in: </strong>{profile.city}, {profile.state}</p>
                            <p className="mb-0"><strong className="pr-1">More about my human: </strong>{profile.owner_description}</p>
                        </div>
                    </div>
                    <div>
                        <div className="col-lg-8">
                                <Vaccinations dogName ={profile.dog_name} profileId={profileId} />
                        </div>
                    </div>    
                </div>      
                </div>
            </div>
        </div>
    )
}