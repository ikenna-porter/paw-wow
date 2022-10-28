import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import stateList from './States';

export default function EditProfileModal(props) {
    const show = props.show;
    const handleClose = props.handleClose;
    const statesOptions = stateList;
    const profile = props.profile;
    const username = localStorage.getItem('currentUser');
    const [editProfile, setEditProfile] = useState(profile);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { ...editProfile };
        const response = await fetch(`http://localhost:8100/api/profiles/${username}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response)
        if (response.ok) {
            props.getProfile();
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit {props.dogName}'s Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                value={editProfile.dog_name}
                                className="form-control"
                                id="floatingInput"
                                placeholder="breed"
                                onChange={(e) => {
                                    setEditProfile({
                                        ...editProfile,
                                        dog_name: e.target.value
                                    })
                                }}
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
                                onChange={(e) => {
                                    setEditProfile({
                                        ...editProfile,
                                        city: e.target.value
                                    })
                                }}
                            />
                            <label htmlFor="floatingInput">City</label>
                        </div>
                        <div className="mb-3">
                            <select
                                className="form-select"
                                required
                                onChange={(e) => {
                                    setEditProfile({
                                        ...editProfile,
                                        state: e.target.value
                                    })
                                }}>
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
                                onChange={(e) => {
                                    setEditProfile({
                                        ...editProfile,
                                        owner_name: e.target.value
                                    })
                                }}
                            />
                            <label htmlFor="floatingInput">Owner Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea
                                className="form-control"
                                value={editProfile.owner_description}
                                placeholder="owner bio"
                                id="floatingTextarea2"
                                style={{ height: "100px" }}
                                onChange={(e) => {
                                    setEditProfile({
                                        ...editProfile,
                                        owner_description: e.target.value
                                    })
                                }}
                            />
                            <label htmlFor="floatingTextarea2">More about owner</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                value={editProfile.social_media}
                                className="form-control"
                                id="floatingInput"
                                placeholder="breed"
                                onChange={(e) => {
                                    setEditProfile({
                                        ...editProfile,
                                        social_media: e.target.value
                                    })
                                }}
                            />
                            <label htmlFor="floatingInput">Owner Social Media</label>
                        </div>
                    </div>
                    <Modal.Footer>
                        <Button className="btn-light close-btn" onClick={handleClose}>
                            Close
                        </Button>
                        <Button className="btn-light form-btn" type="submit" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
    )
} 