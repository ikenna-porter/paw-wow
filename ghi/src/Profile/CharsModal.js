import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react'

export default function CharacteristicsModal(props) {
    const show = props.show;
    const handleClose = props.handleClose;
    const [ changedChar, setChangedChar ] = useState(props.chars);
    console.log("state in modal", changedChar)

    function changeChar(char, value) {
        let targetObj = props.chars.filter(obj => obj.char === char);
        let idx = props.chars.indexOf(targetObj[0])
        let newArr = [...changedChar]
        newArr[idx] = {char: char, value: value}
        setChangedChar(newArr)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedChars = {};
        for (let obj of changedChar) {
            updatedChars[obj.char] = obj.value
        };
        const data = {
            dog_friendly: parseInt(updatedChars['dog friendly']),
            kid_friendly: parseInt(updatedChars['kid friendly']),
            people_friendly: parseInt(updatedChars['people friendly']),
            energy_level: parseInt(updatedChars['energy level']),
            DOB: props.DOB,
            fixed: props.fixed,
            size: props.size,
            profile_id: props.profileId
        };
        console.log("data", data)
        
        if (props.hasChars) {
            const putUrl = `http://localhost:8100/api/characteristics/${props.profileId}`;
            const putFetchConfig = {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const putResponse = await fetch(putUrl, putFetchConfig);
            if (putResponse.ok) {
                props.getChars()
            }
        } else {
            const postUrl = `http://localhost:8100/api/characteristics/${props.profileId}`;
            const postFetchConfig = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const postResponse = await fetch(postUrl, postFetchConfig);
            if (postResponse.ok) {
                props.getChars()
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
                    {changedChar.map(obj => {
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