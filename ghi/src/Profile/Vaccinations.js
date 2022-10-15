import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Vaccinations(props) {
    const [ hasVaccines, setHasVaccines ] = useState(false);
    const [ vaccines, setVaccines ] = useState(
        {
            distemper: false,
            parvo: false,
            adeno: false,
            rabies: false,
            other: ''
        })
    const profileId = props.profileId

    useEffect(() => {
        async function getVaccines(props) {
            const response = await fetch(`http://localhost:8100/api/vaccinations/${profileId}`)
            if (response.ok) {
                setHasVaccines(true);
                const data = await response.json();
                setVaccines(data);
            }
        } 
        getVaccines();   
    }, [])
    return(
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Vaccination Records</h5>
                { hasVaccines
                    ? <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Distemper</th>
                                <th>Parvo</th>
                                <th>Adeno</th>
                                <th>Rabies</th>
                                <th>Other</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{String(vaccines.distemper)}</td>
                                <td>{String(vaccines.parvo)}</td>
                                <td>{String(vaccines.adeno)}</td>
                                <td>{String(vaccines.rabies)}</td>
                                <td>{String(vaccines.other)}</td>
                            </tr>
                        </tbody>
                    </table>
                    : <Link to="/profile/create-vaccinations" className="btn btn-secondary">Add Vaccination Records</Link>
                }
            </div>
        </div>    
    )
}