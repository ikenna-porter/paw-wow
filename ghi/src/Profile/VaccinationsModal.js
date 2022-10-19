import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react'

export default function VacctinationsModal(props) {
    const show = props.show;
    const handleClose = props.handleClose;
    const [ checkDistemper, setCheckDistemper ] = useState(props.vaccines.distemper);
    const [ checkParvo, setCheckParvo ] = useState(props.vaccines.parvo);
    const [ checkAdeno, setCheckAdeno ] = useState(props.vaccines.adeno);
    const [ checkRabies, setCheckRabies ] = useState(props.vaccines.rabies);
    const [ other, setOther ] = useState(props.vaccines.other);
    const profileId = props.profileId;
    // console.log("distemper vacc in modal:", checkDistemper)
    const [ vaccinesToDisplay, setVaccinesToDisplay] = useState(props.vaccines)
    console.log(vaccinesToDisplay)
    console.log("These are the vaccs for the modal: ", vaccinesToDisplay);

    useEffect(() => {
        props.getVaccines(props.profileId)
            .then((vaccinations) => {
                setVaccinesToDisplay(vaccinations);
            })
            .catch((e) => {
                console.log('Could not resolve getVaccines promise!')
            })
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = vaccinesToDisplay;

        if (props.hasVaccines) {
            const putUrl = `http://localhost:8100/api/vaccinations/${profileId}`;
            const putFetchConfig = {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const putResponse = await fetch(putUrl, putFetchConfig);
            if (putResponse.ok) {
                console.log("Finna put some vaccs");
                props.getVaccines(props.profileId)
                    .then((updatedVaccinations) => {
                        props.setVaccines(updatedVaccinations);
                    });
                console.log("I should see new vaccs")
            }
        }  else {
            const postUrl = 'http://localhost:8100/api/vaccinations'
            const postFetchConfig = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        
            const postResponse = await fetch(postUrl, postFetchConfig);
            if (postResponse.ok) {
                props.getVaccines(props.profileId)
                    .then((newVaccinations) => {
                        props.setVaccines(newVaccinations)
                    })
                    .catch((e) => {
                        'Could not resolve getVaccines promise!'
                    });
            } 
        }         
    }

    return(
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                { props.hasVaccines 
                    ? <Modal.Title>Edit Vaccination Records</Modal.Title>
                    : <Modal.Title>Add Vaccination Records</Modal.Title>
                }    
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input" 
                                type="checkbox" 
                                role="switch"
                                checked={vaccinesToDisplay.distemper}
                                id="flexSwitchCheckDefault"
                                onChange={(e) => {setVaccinesToDisplay({
                                    ...vaccinesToDisplay,
                                    distemper: e.target.checked,
                                })}}
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Distemper</label>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input" 
                                type="checkbox" 
                                role="switch"
                                checked={vaccinesToDisplay.parvo}
                                id="flexSwitchCheckDefault"
                                onChange={(e) => {setVaccinesToDisplay({
                                    ...vaccinesToDisplay,
                                    parvo: e.target.checked,
                                })}}
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Parvo</label>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input" 
                                type="checkbox" 
                                role="switch"
                                checked={vaccinesToDisplay.adeno}
                                value=""
                                id="flexSwitchCheckDefault"
                                onChange={(e) => {setVaccinesToDisplay({
                                    ...vaccinesToDisplay,
                                    adeno: e.target.checked,
                                })}}
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Adeno</label>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input" 
                                type="checkbox" 
                                role="switch"
                                checked={vaccinesToDisplay.rabies}
                                id="flexSwitchCheckDefault"
                                onChange={(e) => {setVaccinesToDisplay({
                                    ...vaccinesToDisplay,
                                    rabies: e.target.checked,
                                })}}
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Rabies</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text" 
                                className="form-control" 
                                id="floatingInput" 
                                placeholder="Other vaccines"
                                value={other}
                                onChange={(e) => {setVaccinesToDisplay({
                                    ...vaccinesToDisplay,
                                    other: e.target.value,
                                })}}
                            />
                            <label htmlFor="floatingInput">Other</label>
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" onClick={handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </form>
            </Modal.Body>    
        </Modal>              
    )
}