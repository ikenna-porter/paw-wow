import { useEffect, useState } from 'react'
import stateList from '../Authenticate/States'

export default function CreateProfile() {
    const [ dogName, setDogName ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ states, setStates ] = useState(stateList);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const profileData = {
            city:city,
            state:state,
            dog_name:dogName
        };
        const profileURL = 'http://localhost:8100/api/profiles';
        const fetchProfileConfig = {
            method: 'post',
            body: JSON.stringify(profileData),
            headers: {
              'Content-Type': 'application/json'
            },
        }

        const profileResponse = await fetch(profileURL, fetchProfileConfig);
        if (profileResponse.ok) {
            setCity('')
            setState('')
            setDogName('')
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
                    <button type="submit" className="btn btn-primary mb-2">Sign Up</button>
                </form>
                </div>
            </div>
        </div>
    )
}