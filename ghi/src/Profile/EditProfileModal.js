import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import stateList from './States';

export default function EditProfileModal(props) {
    const show = props.show;
    const handleClose = props.handleClose;
    const statesOptions = stateList; 
    const profile = props.profile;
    const [ editProfile, setEditProfile ] = useState(profile);

    return ( 
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit {props.dogName}'s Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div>
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">{props.dogName}'s picture</label>
                        <input value={editProfile.avatar} className="form-control" type="file" id="formFile"/>
                    </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text" 
                                value={editProfile.dog_name}
                                className="form-control" 
                                id="floatingInput" 
                                placeholder="breed"
                                // onChange={(e) => { setEditDetails({
                                //     ...editDetails,
                                //     breed: e.target.value
                                // })}}
                            />
                            <label htmlFor="floatingInput">Dog Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text" 
                                value={editProfile.city}
                                className="form-control" 
                                id="floatingInput" 
                                placeholder="breed"
                                // onChange={(e) => { setEditDetails({
                                //     ...editDetails,
                                //     breed: e.target.value
                                // })}}
                            />
                            <label htmlFor="floatingInput">City</label>
                        </div>
                        <div className="mb-3">
                            <select className="form-select" required>
                                <option value='default'>Select a State</option>
                                {statesOptions.map(state => { 
                                    return (
                                    <option value={state.abbreviation} key={state.abbreviation}>{state.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text" 
                                value={editProfile.owner_name}
                                className="form-control" 
                                id="floatingInput" 
                                placeholder="breed"
                                // onChange={(e) => { setEditDetails({
                                //     ...editDetails,
                                //     breed: e.target.value
                                // })}}
                            />
                            <label htmlFor="floatingInput">Owner Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea
                                className="form-control" 
                                value={editProfile.owner_bio}
                                placeholder="owner bio" 
                                id="floatingTextarea2" 
                                style={{height: "100px"}}
                                // onChange={(e) => {setEditDetails({
                                //     ...editDetails,
                                //     dog_bio: e.target.value
                                // })}}
                            />
                            <label htmlFor="floatingTextarea2">More about owner</label>
                        </div>
                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="info" type="submit" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer> 
                </form>
            </Modal.Body>
        </Modal> 
    )
} 