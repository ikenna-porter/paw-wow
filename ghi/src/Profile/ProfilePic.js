import { useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function ProfilePic(props) {
    const [ image, setImage ] = useState(null);
    const [ imagePath, setImagePath ] = useState('');

    const postProfilePic = async (profileId, dataURI) => {
        const url = `http://localhost:8100/api/profile-pic/${profileId}`;
        const form = new FormData();
        form.append('data_URI', dataURI)

        const postFetchConfig = {
            method: 'POST',
            body: form,
            credentials: 'include',
        };
        const response = await fetch(url, postFetchConfig);
        return response;         
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
                // console.log(dataURI);
                postProfilePic(props.profileId, dataURI);
            })
            .catch((e) => {
                console.log('Could not upload image: ', e);
            });
    }

    return (
        <div className="profile-pic-uplaod-form">
            <form onSubmit={handleSubmit}>
                <input
                    value={imagePath}
                    className="form-control" 
                    type="file" 
                    id="formFile"
                    onChange={e => {
                        setImagePath(e.target.value);
                        setImage(e.target.files[0]);
                    }}
                />
                <Button type='submit' className='btn btn-info'>
                    Upload Image
                </Button>
            </form>
        </div>
    )
}