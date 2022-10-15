import { useNavigate } from "react-router-dom";
import { useState } from 'react'

export default function CreateVacctinations(props) {
    const [ vaccines, setVaccines ] = useState(
        {
            distemper: false,
            parvo: false,
            adeno: false,
            rabies: false,
            other: ''
        })
    const profileId = 14
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = vaccines;
        data['profile_id'] = profileId;

        const url = 'http://localhost:8100/api/vaccinations'
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setVaccines({
                distemper: false,
                parvo: false,
                adeno: false,
                rabies: false,
                other: '' 
            })
        }

    }

    return(
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add Vaccination Records</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-check">
                        <input
                            className="form-check-input" 
                            type="checkbox" 
                            value="" 
                            id="flexCheckDefault"
                            onChange={(e) => {setVaccines.distemper(true)}}
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">Distemper</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input" 
                            type="checkbox" 
                            value="" 
                            id="flexCheckDefault"
                            onChange={(e) => {setVaccines.parvo(true)}}
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">Parvo</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input" 
                            type="checkbox" 
                            value="" 
                            id="flexCheckDefault"
                            onChange={(e) => {setVaccines.adeno(true)}}
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">Adeno</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input" 
                            type="checkbox" 
                            value="" 
                            id="flexCheckDefault"
                            onChange={(e) => {setVaccines.rabies(true)}}
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">Rabies</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text" 
                            className="form-control" 
                            id="floatingInput" 
                            placeholder="Other vaccines"
                            onChange={(e) => {setVaccines.other(e.target.value)}}
                            value={vaccines.other}
                        />
                        <label htmlFor="floatingInput">Other</label>
                    </div>
                    <button type="submit" className="btn btn-success">Add Vaccines</button>
                </form>
                </div> 
            </div>
        </div>           
    )
}