import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

export default function CharsModal(props) {
    const profileId = localStorage.getItem('profileId')
    const show = props.show;
    const handleClose = props.handleClose;
    const chars = props.chars;
    const [ editChars, setEditChars ] = useState(chars);
    const details = props.dogDetails;
    const [ editDetails, setEditDetails ] = useState(details);

    function changeChar(char, value) {
        let targetObj = editChars.filter(obj => obj.char === char);
        let idx = editChars.indexOf(targetObj[0])
        let newArr = [...editChars]
        newArr[idx] = {char: char, value: value}
        setEditChars(newArr)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedChars = {};
        for (let obj of editChars) {
            updatedChars[obj.char] = obj.value
        };
        const data = {
            dog_friendly: parseInt(updatedChars['dog friendly']),
            kid_friendly: parseInt(updatedChars['kid friendly']),
            people_friendly: parseInt(updatedChars['people friendly']),
            energy_level: parseInt(updatedChars['energy level']),
            DOB: editDetails.DOB,
            fixed: editDetails.fixed,
            size: editDetails.size,
            gender: editDetails.gender,
            breed: editDetails.breed,
            dog_bio: editDetails.dog_bio
        };
        
        if (props.hasChars) {
            const putUrl = `http://localhost:8100/api/characteristics/${profileId}`;
            const putFetchConfig = {
                method: 'PUT',
                body: JSON.stringify(data),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const putResponse = await fetch(putUrl, putFetchConfig);
            if (putResponse.ok) {
                props.getChars(profileId)
            }
        } else {
            const postUrl = `http://localhost:8100/api/characteristics`
            const postFetchConfig = {
                method: 'POST',
                body: JSON.stringify(data),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const postResponse = await fetch(postUrl, postFetchConfig);
            if (postResponse.ok) {
                props.getChars(profileId)
            }
        }
    }

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton> 
                { props.hasChars 
                    ? <Modal.Title>Edit {props.dogName}'s Characteristics</Modal.Title>
                    : <Modal.Title>Add Characteristics for {props.dogName}</Modal.Title>
                }
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="form-label fw-semibold">{props.dogName}'s Bio</label>
                        <div className="form-floating mb-3">
                            <input
                                type="date" 
                                value={editDetails.DOB}
                                className="form-control" 
                                id="floatingInput"
                                onChange={(e) => {setEditDetails({
                                    ...editDetails,
                                    DOB: e.target.value
                                })}}
                            />
                            <label htmlFor="floatingInput">DOB</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text" 
                                value={editDetails.breed}
                                className="form-control" 
                                id="floatingInput" 
                                placeholder="breed"
                                onChange={(e) => { setEditDetails({
                                    ...editDetails,
                                    breed: e.target.value
                                })}}
                            />
                            <label htmlFor="floatingInput">Breed</label>
                        </div>
                        <div className="mb-3">
                            <select
                                className="form-select" 
                                onChange={(e) => {setEditDetails({
                                    ...editDetails,
                                    gender: e.target.value
                                })}}
                            >
                                <option defaultValue>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <select
                                className="form-select"
                                onChange={(e) => {setEditDetails({
                                    ...editDetails,
                                    size: e.target.value
                                })}}
                            >
                                <option defaultValue>Select a size</option>
                                <option value="Small">Small</option>
                                <option value="Medium">Medium</option>
                                <option value="Large">Large</option>
                            </select>
                        </div>
                        <div className="form-check mb-3 form-switch">
                            <input
                                type="checkbox" 
                                checked={editDetails.fixed}
                                className="form-check-input" 
                                role="switch" 
                                id="flexSwitchCheckDefault"
                                onChange={(e) => {setEditDetails({
                                    ...editDetails,
                                    fixed: e.target.checked
                                })}}
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Is {props.dogName} fixed?</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea
                                className="form-control" 
                                value={editDetails.dog_bio}
                                placeholder="dog bio" 
                                id="floatingTextarea2" 
                                style={{height: "100px"}}
                                onChange={(e) => {setEditDetails({
                                    ...editDetails,
                                    dog_bio: e.target.value
                                })}}
                            />
                            <label htmlFor="floatingTextarea2">Tell us more about {props.dogName}</label>
                        </div>
                    </div>
                    <div>
                        <label className="form-label fw-semibold">Characteristics</label>
                            {editChars.map(obj => {
                                return (
                                    <div key={obj.char}>
                                        <label htmlFor="customRange2" className="form-label">{obj.char}</label>
                                        <input
                                            type="range" 
                                            name={obj.char}
                                            value={obj.value} 
                                            className="form-range" 
                                            min="1" 
                                            max="5" 
                                            id="customRange2"
                                            onInput={(e) => {changeChar(e.target.name, e.target.value)}}
                                        />
                                    </div>
                                )
                            })}
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