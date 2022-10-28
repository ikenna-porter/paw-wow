import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import VacctinationsModal from './VaccinationsModal';

export default function Vaccinations(props) {
    const profileId = localStorage.getItem('profileId')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ hasVaccines, setHasVaccines ] = useState(false);
    const [ vaccines, setVaccines ] = useState({
        distemper: false,
        parvo: false,
        adeno: false,
        rabies: false,
        other: ''
    });

    async function getVaccines() {
        const response = await fetch(
            `http://localhost:8100/api/vaccinations/${profileId}`,
            {credentials: 'include'}
        )
        if (response.ok) {
            const data = await response.json();
            if (Object.keys(data).length > 1) {
                setHasVaccines(true);
                setVaccines(data);
            }
        }
    } 

    function checkVacc(vacc) {
        if (vacc) {
            return '✅'
        }
        return '❌'
    }

    useEffect(() => {
        getVaccines();
    }, [profileId]);

    return(
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Vaccination Records</h5>
                    <VacctinationsModal
                        show={show} 
                        handleClose={handleClose} 
                        getVaccines={getVaccines}
                        hasVaccines={hasVaccines}
                        vaccines={vaccines}
                        setVaccines={setVaccines}
                    />
                    { hasVaccines
                        ?
                        <div>
                            <Button className="btn btn-light form-btn btn-sm" onClick={handleShow}>
                                Edit Vaccination Records for {props.dogName}
                            </Button>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Vaccination Name</th>
                                        <th>{props.dogName}'s Records</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Distemper</td>
                                        <td>{checkVacc(vaccines.distemper)}</td>
                                    </tr>
                                    <tr>
                                        <td>Parvo</td>    
                                        <td>{checkVacc(vaccines.parvo)} </td>
                                    </tr>
                                    <tr>  
                                        <td>Adeno</td>  
                                        <td>{checkVacc(vaccines.adeno)}</td>
                                    </tr>    
                                    <tr>
                                        <td>Rabies</td>
                                        <td>{checkVacc(vaccines.rabies)}</td>
                                    </tr>
                                    <tr>    
                                        <td>Other</td>
                                        <td>{vaccines.other}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        : 
                        <div>
                            <Button className="btn btn-light form-btn btn-sm" onClick={handleShow}>
                                Add Vaccination records for {props.dogName}
                            </Button>
                        </div>
                    }
                </div>
            </div>   
    )
}
