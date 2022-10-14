import { useState, useEffect } from 'react'
import Vaccinations from './Vaccinations';
import { Link, Outlet } from 'react-router-dom';

export default function Profile(props) {
    const [ hasVaccines, setHasVaccines ] = useState(false);
    const [ hasChars, setHasChars ] = useState(false);
    const [ dogName, setDogName ] = useState('');
    const [ ownerName, setOwnerName ] = useState('');
    const [ ownerDescription, setOwnerDescription ] = useState('');
    const [ city, setCity ] = useState('')
    const [ states, setStates ] = useState('');
    const [ avatar, setAvatar ] = useState('');
    const profileId = 13
    console.log("profile id in profile:", profileId)

    useEffect(() => {
        async function getProfile() {
            const response = await fetch(`http://localhost:8100/api/profiles/${profileId}`)
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setDogName(data.dog_name);
                setOwnerName(data.owner_name);
                setOwnerDescription(data.owner_description);
                setCity(data.city);
                setStates(data.state);
            }
        }   
        getProfile();

        async function getVaccines() {
            try {
                const response = await fetch(`http://localhost:8100/api/vaccinations/${profileId}`)
                console.log("vaccinations response",response.status)
                if (response.ok) {
                    setHasVaccines(true)
                } else if (response.status === 404) {
                    return 
                }
            } catch(e) {
                throw e
            }
        }
        if (!hasVaccines) {
            getVaccines()
        }
    }, [])
    
    if (!dogName) {
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
                        <h3>{dogName}</h3>
                    </div>
                        <div className="card-body">
                            <p className="mb-0"><strong className="pr-1">I live in: </strong>{city}, {states}</p>
                            <p className="mb-0"><strong className="pr-1">My human is: </strong>{ownerName}</p>
                            <p className="mb-0"><strong className="pr-1">More about my human: </strong>{ownerDescription}</p>
                        </div>
                    </div>
                    <Outlet/>
                    <div>
                        <div className="col-lg-8">
                            { hasVaccines
                                ? <Vaccinations />
                                : <Link to="/profile/create-vaccinations">Add Vaccination Records</Link>
                            }
                        </div>
                    </div>
                    </div>
                        <div style={{height: "26px"}}></div>
                        <div className="card-header bg-transparent border-0">
                            <h3 className="mb-0"><i className="far fa-clone pr-1"></i>Other Information</h3>
                    </div>
                        <div className="card-body pt-0">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}