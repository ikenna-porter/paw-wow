import { useState } from 'react'
import stateList from './States'
import { useNavigate } from "react-router-dom";

export default function CreateProfile(props) {
    const [ dogName, setDogName ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ states, setStates ] = useState(stateList);
    const [ ownerName, setOwnerName ] = useState('');
    const [ ownerDescription, setOwnerDescription ] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            city: city,
            state: state,
            dog_name: dogName,
            owner_name: ownerName,
            owner_description: ownerDescription
        };
        const url = 'http://localhost:8100/api/profiles';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
        }

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const responseData = await response.json()
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
                        <label htmlFor="dog name" className="form-label">Dog Name</label>
                        <input
                            placeholder="Dog Name" 
                            required type="text"  
                            onChange={e => setDogName(e.target.value)} 
                            value={dogName}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">City</label>
                        <input
                            placeholder="City" 
                            required type="text" 
                            onChange={e => setCity(e.target.value)} 
                            value={city}
                        />
                    </div>
                    <div className="mb-3">
                        <select
                            className="form-select" 
                            required 
                            onChange={e => setState(e.target.value)}
                        >
                        <option value='default'>Select a State</option>
                        {states.map(state => { 
                            return (
                            <option
                                value={state.abbreviation} 
                                key={state.abbreviation}>{state.name}
                            </option>
                            )
                        })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="owner name" className="form-label">Owner Name</label>
                        <input
                            placeholder="Owner Name" 
                            required type="text"  
                            onChange={e => setOwnerName(e.target.value)} 
                            value={ownerName}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="owner description" 
                            className="form-label"
                        >
                            Owner Description
                        </label>
                        <textarea
                        placeholder="About my owner"
                        required 
                        type="text"  
                        onChange={e => setOwnerDescription(e.target.value)} 
                        value={ownerDescription}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">Sign Up</button>
                </form>
                </div>
            </div>
        </div>
    )
}