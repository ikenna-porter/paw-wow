import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react'

export default function CharsModal(props) {
    const show = props.show;
    const handleClose = props.handleClose;
    const chars = props.chars;
    const [ changedChar, setChangedChar ] = useState(chars);

    if (!props.hasChars) {
        setChangedChar([
            {char: 'dog friendly', value: 1},
            {char: 'kid friendly', value: 1},
            {char: 'people friendly', value: 1},
            {char: 'energy level', value: 1}
        ])
    }

    function changeChar(char, value) {
        let targetObj = changedChar.filter(obj => obj.char === char);
        let idx = changedChar.indexOf(targetObj[0])
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
            DOB: props.dogDetails.DOB,
            fixed: props.dogDetails.fixed,
            size: props.dogDetails.size,
            profile_id: props.profileId,
            gender: props.dogDetails.gender,
            breed: props.dogDetails.breed,
            dog_bio: props.dogDetails.dog_bio
        };
        console.log("data", data)
        const charsUrl = `http://localhost:8100/api/characteristics/${props.profileId}`;
        
        if (props.hasChars) {
            const putFetchConfig = {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const putResponse = await fetch(charsUrl, putFetchConfig);
            console.log(putResponse)
            if (putResponse.ok) {
                props.getChars()
            }
        } else {
            const postFetchConfig = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const postResponse = await fetch(charsUrl, postFetchConfig);
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
                    <div>
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