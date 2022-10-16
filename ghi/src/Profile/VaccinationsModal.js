import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react'

export default function VacctinationsModal(props) {
    const show = props.show;
    const handleClose = props.handleClose;
    const vaccines = props.vaccines 
    const [ savedVacc, setSavedVacc] = useState({...vaccines});
    const setVaccines = props.setVaccines;
    const profileId = props.profileId;
    console.log("vaccines from props:", vaccines)
    console.log("copy of vaccines", savedVacc)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = savedVacc;
        data['profile_id'] = profileId;

        if (props.hasVaccines) {
            const putUrl = `http://localhost:8100/api/vaccinations/${profileId}`
            const putFetchConfig = {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const putResponse = await fetch(putUrl, putFetchConfig);
            if (putResponse.ok) {
                setSavedVacc({
                    distemper: false,
                    parvo: false,
                    adeno: false,
                    rabies: false,
                    other: '' 
                })
                props.getVaccines()
            }
        }        
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
            setSavedVacc({
                distemper: false,
                parvo: false,
                adeno: false,
                rabies: false,
                other: '' 
            })
            props.getVaccines()
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
                        <div className="form-check">
                            <input
                                className="form-check-input" 
                                type="checkbox" 
                                checked={savedVacc.distemper}
                                id="flexCheckDefault"
                                onChange={(e) => {setSavedVacc({
                                    ...savedVacc,
                                    distemper: !savedVacc.distemper
                                })}}
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">Distemper</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input" 
                                type="checkbox" 
                                checked={savedVacc.parvo}
                                id="flexCheckDefault"
                                onChange={(e) => {setSavedVacc({
                                    ...savedVacc,
                                    parvo: !savedVacc.parvo
                                })}}
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">Parvo</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input" 
                                type="checkbox" 
                                checked={savedVacc.adeno}
                                value=""
                                id="flexCheckDefault"
                                onChange={(e) => {setSavedVacc({
                                    ...savedVacc,
                                    adeno: !savedVacc.adeno
                                })}}
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">Adeno</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input" 
                                type="checkbox" 
                                checked={savedVacc.rabies}
                                id="flexCheckDefault"
                                onChange={(e) => {setSavedVacc({
                                    ...savedVacc,
                                    rabies: !savedVacc.rabies
                                })}}
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">Rabies</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text" 
                                className="form-control" 
                                id="floatingInput" 
                                placeholder="Other vaccines"
                                onChange={(e) => {setSavedVacc({
                                    ...savedVacc,
                                    other: e.target.value
                                })}}
                                value={savedVacc.other}
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