import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import VacctinationsModal from './VaccinationsModal';

export default function Vaccinations(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
    const dogName = props.dogName
    console.log("distemper in vacc:", vaccines.distemper)

    async function getVaccines() {
        const response = await fetch(`http://localhost:8100/api/vaccinations/${profileId}`)
        if (response.ok) {
            setHasVaccines(true);
            const data = await response.json();
            setVaccines(data);
        }
    } 

    useEffect(() => {
        getVaccines();   
    }, [hasVaccines]);

    return(
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Vaccination Records</h5>
                <VacctinationsModal
                    show={show} 
                    handleClose={handleClose} 
                    profileId={profileId} 
                    getVaccines={getVaccines}
                    hasVaccines={hasVaccines}
                    vaccines={vaccines}
                    setVaccines={setVaccines}
                />
                { hasVaccines
                    ?
                    <div>
                        <Button variant="primary" onClick={handleShow}>
                            Edit Vaccination Records for {dogName}
                        </Button>
                        <table className="table table-striped">
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
                    </div>
                    : <Button variant="primary" onClick={handleShow}>
                        Add Vaccination records for {dogName}
                    </Button>
                }
            </div>
        </div>    
    )
}