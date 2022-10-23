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
        console.log("vax response", response)
        if (response.ok) {
            const data = await response.json();
            console.log("vax data", data)
            if (Object.keys(data).length > 1) {
                setHasVaccines(true);
                setVaccines(data);
            }
        }
    } 

    useEffect(() => {
        getVaccines();
    }, []);

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
                        <Button className="btn btn-info btn-sm" onClick={handleShow}>
                            Edit Vaccination Records for {props.dogName}
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
                    : 
                    <div>
                        <Button className="btn btn-info btn-sm" onClick={handleShow}>
                            Add Vaccination records for {props.dogName}
                        </Button>
                    </div>
                }
            </div>
        </div>    
    )
}