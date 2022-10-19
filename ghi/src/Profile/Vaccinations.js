import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import VacctinationsModal from './VaccinationsModal';

export default function Vaccinations(props) {
    const profileId = props.profileId
    let vaccinationsData = {
        distemper: false,
        parvo: false,
        adeno: false,
        rabies: false,
        other: '',
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ hasVaccines, setHasVaccines ] = useState(false);
    const [ vaccines, setVaccines ] = useState(vaccinationsData);
    const [ vaccinesForModal, setVaccinesForModal] = useState(vaccinationsData);
    // console.log("distemper in vacc:", vaccines.distemper)

    // async function getVaccines() {
    //     const response = await fetch(`http://localhost:8100/api/vaccinations/${profileId}`)
    //     if (response.ok) {
    //         setHasVaccines(true);
    //         const data = await response.json();
    //         setVaccines(data);
    //     }
    // } 

    async function getVaccines(profileId) {
        const response = await fetch(`http://localhost:8100/api/vaccinations/${profileId}`);
        const data = await response.json();
        return data;
    }

    useEffect(() => {
        getVaccines(profileId)
            .then((vaccinations) => {
                setVaccines(vaccinations);
                setVaccinesForModal(vaccinations)
                setHasVaccines(true)
            })
            .catch((e) => {
                console.log('Could not resolve getVaccines promise!')
            })
    }, [hasVaccines]);

    return(
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Vaccination Records</h5>
                {/* <VacctinationsModal
                    show={show} 
                    handleClose={handleClose} 
                    profileId={profileId} 
                    getVaccines={getVaccines}
                    hasVaccines={hasVaccines}
                    vaccines={vaccinesForModal}
                    setVaccines={setVaccines}
                /> */}
                { hasVaccines
                    ?
                    <div>
                        <VacctinationsModal
                            show={show} 
                            handleClose={handleClose} 
                            profileId={profileId} 
                            getVaccines={getVaccines}
                            hasVaccines={hasVaccines}
                            vaccines={vaccines}
                            setVaccines={setVaccines}
                        />
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
                        <VacctinationsModal
                            show={show} 
                            handleClose={handleClose} 
                            profileId={profileId} 
                            getVaccines={getVaccines}
                            hasVaccines={hasVaccines}
                            vaccines={vaccinesForModal}
                            setVaccines={setVaccines}
                        />
                        <Button className="btn btn-info btn-sm" onClick={handleShow}>
                            Add Vaccination records for {props.dogName}
                        </Button>
                    </div>
                }
            </div>
        </div>    
    )
}