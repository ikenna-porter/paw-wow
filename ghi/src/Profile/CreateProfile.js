import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import stateList from '../Authenticate/States'
import { useNavigate } from "react-router-dom";

export default function CreateProfile(props) {
    const [ dogName, setDogName ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ states, setStates ] = useState(stateList);
    const [ ownerName, setOwnerName ] = useState('');
    const [ ownerDescription, setOwnerDescription ] = useState('');
    const token = props.token
    const accountId = props.accountId
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            city: city,
            state: state,
            dog_name: dogName,
            account_id: accountId,
            owner_name: ownerName,
            owner_description: ownerDescription
        };
        console.log("data", data)
        const url = 'http://localhost:8100/api/profiles';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            },
        }

        const response = await fetch(url, fetchConfig);
        console.log("response:", response)
        if (response.ok) {
            setCity('');
            setState('');
            setDogName('');
            setOwnerName('');
            setOwnerDescription('');
            navigate("/profile");
        }

    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create a Profile</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input placeholder="Dog Name" required type="text"  onChange={e => setDogName(e.target.value)} value={dogName}/>
                        <label htmlFor="dog name">Dog Name</label>
                    </div>
                    <div className="mb-3">
                    <input placeholder="City" required type="text" onChange={e => setCity(e.target.value)} value={city}/>
                    <label htmlFor="city">City</label>
                    </div>
                    <div className="mb-3">
                        <select required onChange={e => setState(e.target.value)}>
                        <option value='default'>Select a State</option>
                        {states.map(state => { 
                            return (
                            <option value={state.abbreviation} key={state.abbreviation}>{state.name}</option>
                            )
                        })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <input placeholder="Owner Name" required type="text"  onChange={e => setOwnerName(e.target.value)} value={ownerName}/>
                        <label htmlFor="owner name">Owner Name</label>
                    </div>
                    <div className="mb-3">
                        <input placeholder="About my owner" required type="text"  onChange={e => setOwnerDescription(e.target.value)} value={ownerDescription}/>
                        <label htmlFor="owner description">Owner Description</label>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">Sign Up</button>
                </form>
                </div>
            </div>
        </div>
    )
}