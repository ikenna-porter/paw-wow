import { useState, useEffect } from 'react'
import Vaccinations from './Vaccinations';
import { Link } from 'react-router-dom';
import Characteristics from './Characteristics';

export default function Profile(props) {
    const [ hasChars, setHasChars ] = useState(false);
    const [ profile, setProfile ] = useState({
        dog_name: '',
        owner_name: '',
        owner_description: '',
        city: '',
        states: '',
        avatar: ''
    })
    const [ chars, setChars ] = useState([]);
    const [ DOB, setDOB ] = useState('');
    const [ fixed, setFixed ] = useState(false);
    const [ size, setSize ] = useState('');
    // This id is hard coded until I put this in local storage
    // If you want to try this out create an account and profile and insert that profile's id and username here
    const profileId = 13
    const username = "Cookie123"

    async function getChars() {
        const charsResponse = await fetch(`http://localhost:8100/api/characteristics/${profileId}`)
        if (charsResponse.ok) {
            const charsData = await charsResponse.json();
            console.log(charsData)
            setHasChars(true);
            setChars([
                {char: 'dog friendly', value: charsData.dog_friendly},
                {char: 'kid friendly', value: charsData.kid_friendly},
                {char: 'people friendly', value: charsData.people_friendly},
                {char: 'energy level', value: charsData.energy_level}
            ]);
            setDOB(charsData.DOB);
            setFixed(charsData.fixed);
            setSize(charsData.size);
        }
    }

    useEffect(() => {
        async function getProfile() {
            const profileResponse = await fetch(`http://localhost:8100/api/profiles/${username}`)
            if (profileResponse.ok) {
                const data = await profileResponse.json();
                setProfile({...data, states: data.state});
            }
        }   
        getProfile();
        getChars();

    }, [])
    
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
                    <div className="card shadow-sm">
                    <div className="card-header bg-transparent text-center">
                        <img
                            className="dog_img" 
                            src="https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2019/02/dog-451643.jpg?h=bf654dbc&itok=MQGvBmuo" 
                            alt="student dp"
                        />
                        <h2>{profile.dog_name}</h2>
                    </div>
                        <div className="card-body">
                            <p className="mb-0"><strong className="pr-1">I was born: </strong>{DOB}</p>
                            <p className="mb-0"><strong className="pr-1">My size is: </strong>{size}</p>
                            <p className="mb-0"><strong className="pr-1">I am fixed: </strong>{String(fixed)}</p>
                            <p className="mb-0"><strong className="pr-1">I live in: </strong>{profile.city}, {profile.states}</p>
                            <p className="mb-0"><strong className="pr-1">My human is: </strong>{profile.owner_name}</p>
                            <p className="mb-0"><strong className="pr-1">More about my human: </strong>{profile.owner_description}</p>
                        </div>
                    </div>
                    <div>   
                    </div>
                        <div className="card-body pt-0">
                                <Characteristics
                                    hasChars={hasChars} 
                                    profileId={profileId} 
                                    chars={chars} 
                                    dogName={profile.dog_name}
                                    DOB={DOB}
                                    size={size}
                                    fixed={fixed}
                                    getChars={getChars}
                                />
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
    )
}