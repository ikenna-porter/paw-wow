import { useState, useEffect } from 'react'
import Vaccinations from './Vaccinations';
import { Link } from 'react-router-dom';
import Characteristics from './Characteristics';
import React from 'react';
import { PersonPlus } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';

export default function Profile(props) {
    const [ hasChars, setHasChars ] = useState(false);
    const [ profile, setProfile ] = useState({
        id: '',
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
    const profileId = 5
    const username = "brunobuddy"

    function calculateAge(DOB) {
        let arr = DOB.split('-')
        let newDOB = arr.map(num => parseInt(num))
        let y = newDOB[0]
        let m = newDOB[1]
        const date = new Date()
        let currentY = date.getFullYear()
        let currentM = date.getMonth() + 1
        let ageY = currentY - y
        let ageM = currentM - m

        if (ageM === 0) {
            return `${ageY} years`
        } else if (ageM < 0) {
            return `${ageY - 1} years, ${Math.abs(ageM)} months`
        } else if (ageM > 0) {
            return `${ageY} years, ${ageM} months`
        }
    }

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
                console.log(data);
                setProfile({...data, states: data.state});
            }
        }   
        getProfile();
        getChars();

    }, [])

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
                            <p className="mb-0"><strong className="pr-1">I am this young: </strong>{calculateAge(DOB)}</p>
                            <p className="mb-0"><strong className="pr-1">My size is: </strong>{size}</p>
                            <p className="mb-0"><strong className="pr-1">I am fixed: </strong>{String(fixed)}</p>
                            <p className="mb-0"><strong className="pr-1">I live in: </strong>{profile.city}, {profile.states}</p>
                            <p className="mb-0"><strong className="pr-1">My human is: </strong>{profile.owner_name}</p>
                            <p className="mb-0"><strong className="pr-1">More about my human: </strong>{profile.owner_description}</p>
                        </div>
                    </div>
                    <div className='container p-3'>
                        {
                            profile.id != 5
                            ?
                            <Button size='md' onClick={handleAdd} value={profile.id}> ADD ME </Button>
                            :
                            <Button size='md' href='http://localhost:3000/list-friends'> View Friends </Button>
                        }
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