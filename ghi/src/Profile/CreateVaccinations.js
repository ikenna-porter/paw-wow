import { useNavigate } from "react-router-dom";
import { useState } from 'react'

export default function CreateVacctinations() {
    const [ distemper, setDistemper ] = useState(false);
    const [ parvo, setParvo ] = useState(false);
    const [ adeno, setAdeno ] = useState(false);
    const [ rabies, setRabies ] = useState(false);
    const [ other, setOther ] = useState('');
    const profileId = 13
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            distemper: distemper,
            parvo: parvo,
            adeno: adeno,
            rabies: rabies,
            other: other,
            profile_id: profileId
        }
        const url = 'http://localhost:8100/api/vaccinations'
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const response = await fetch(url, fetchConfig);
        console.log("vaccination response", response)
        if (response.ok) {
            setDistemper(false);
            setParvo(false);
            setAdeno(false);
            setRabies(false);
            setOther('')
            navigate("/profile") 
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
                            onChange={(e) => {setDistemper(true)}}
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">Distemper</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input" 
                            type="checkbox" 
                            value="" 
                            id="flexCheckDefault"
                            onChange={(e) => {setParvo(true)}}
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">Parvo</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input" 
                            type="checkbox" 
                            value="" 
                            id="flexCheckDefault"
                            onChange={(e) => {setAdeno(true)}}
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">Adeno</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input" 
                            type="checkbox" 
                            value="" 
                            id="flexCheckDefault"
                            onChange={(e) => {setRabies(true)}}
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">Rabies</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text" 
                            className="form-control" 
                            id="floatingInput" 
                            placeholder="Other vaccines"
                            onChange={(e) => {setOther(e.target.value)}}
                            value={other}
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