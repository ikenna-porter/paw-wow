import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ProfilePicModal(props) {
    const show = props.show;
    const handleClose = props.handleClose;
    const [ image, setImage ] = useState(null);
    const profileId = localStorage.getItem('profileId')

    const sendProfilePic = async (profileId, dataURI) => {
        const url = `http://localhost:8100/api/profile-pic/${profileId}`;
        const form = new FormData();
        form.append('data_URI', dataURI)
        
        if (props.hasPic) {
            const putFetchConfig = {
                method: 'PUT',
                body: form,
                credentials: 'include',
                headers: {'accept': 'application/json'}
            }
            const putResponse = await fetch(url, putFetchConfig);
            if (putResponse.ok) {
                props.getProfilePic(profileId);
            }
        } else {
            const postFetchConfig = {
                method: 'POST',
                body: form,
                credentials: 'include',
                headers: {'accept': 'application/json'}
            };
            const postResponse = await fetch(url, postFetchConfig);
            if (postResponse.ok) {
                props.getProfilePic(profileId);
            }
        }         
    }

    const convertImgToURI = (image) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsBinaryString(image);
            fileReader.onload = function(e) {
                const base64ImageString = btoa(e.target.result); // Converts binary data to base64
                resolve(`data:${image.type};base64,${base64ImageString}`);
            }
            fileReader.onerror = function(e) {
                console.log('Could not convert image to base64. Error: ', e);
                reject();
            }
        })
    }

    // Send base64 image string to Profile Pic endpoint
    const handleSubmit = async (e) => {
        e.preventDefault();
        convertImgToURI(image)
            .then(dataURI => {
                sendProfilePic(profileId, dataURI);
            })
            .catch((e) => {
                console.log('Could not upload image: ', e);
            });
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            { props.hasPic 
                    ? <Modal.Title>Edit Profile Picture</Modal.Title>
                    : <Modal.Title>Add Profile Picture</Modal.Title>
                }
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <input
                        className="form-control" 
                        type="file" 
                        id="formFile"
                        onChange={e => {
                            setImage(e.target.files[0]);
                        }}
                    />
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