import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [ users, setUsers ] = useState([]);
    const [ filteredUsers, setFilteredUsers ] = useState([]);
    const [ standardResults, setStandardResults ] = useState([]);
    const userCity = localStorage.getItem('userCity');
    const userState = localStorage.getItem('userState');
    const currentUser = localStorage.getItem('profileId');
    const navigate = useNavigate();

    function calculateAge(DOB) {
        if (DOB) {
            let arr = DOB.split('-')
            let newDOB = arr.map(num => parseInt(num))
            let y = newDOB[0]
            let m = newDOB[1]
            const date = new Date()
            let ageY = date.getFullYear() - y
            let ageM = (date.getMonth() + 1) - m

            if (ageM === 0) {
                return `${ageY} years`
            } else if (ageM < 0) {
                return `${ageY - 1} years, ${12+ageM} months`
            } else if (ageM > 0) {
                return `${ageY} years, ${ageM} months`
            }
        }
    }

    useEffect(() => {
        async function getUsers() {
            const response = await fetch('http://localhost:8100/api/profiles', {credentials: 'include'});
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setUsers(data.filter(user => user.profile_id !== currentUser));
                setStandardResults(data.filter(user => user.city === userCity && user.state === userState));
                setFilteredUsers(data.filter(user => user.city === userCity && user.state === userState));
            }
        }
        if (users.length === 0) {
            getUsers();
        }
    }, [])

    const handleSearch = (event) => {
        let searchInput = event.target.value
        if (searchInput.length === 0) {
            setFilteredUsers(standardResults)
        } else {
            let filteredResults = []
            users.forEach( user => {
                if (user.dog_name.includes(searchInput)) {
                    filteredResults.push(user)
                }
            })
            setFilteredUsers(filteredResults)
        }
    }

    const handleConnect = (event) => {
        event.preventDefault();

        // localStorage.setItem('otherProfileId', `${event.target.value}`);
        navigate(`/profile/${event.target.value}`)
    }

    if (filteredUsers.length === 0) {
        return (
            <div>
                <form onSubmit={event => {event.preventDefault()}}>
                    <div className="input-group mb-3 p-4">
                        <input
                            className="form-control me-2" 
                            type="search" 
                            placeholder="Search" 
                            aria-label="Search"
                            onChange={handleSearch}
                        />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </div>   
                </form>
            </div>        
        )
    } else {
        return (
            <div>
                <form onSubmit={event => {event.preventDefault()}}>
                    <div className="input-group mb-3 p-4">
                        <input
                            className="form-control me-2" 
                            type="search" 
                            placeholder="Search" 
                            aria-label="Search"
                            onChange={handleSearch}
                        />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </div>    
                </form>
                <h3>Other Pups</h3>
                <div className="row">
                {filteredUsers.map(user => {
                    return(
                        <div key={user.profile_id} className="col-4">
                            <div className="card" style={{width: "14rem"}}>
                                {
                                    user.img ?
                                    <img src={user.img} className="card-img-top" alt="..." />
                                    :
                                    <img className='profile-pic' src={require('../Images/dogoutline.png')}/>
                                }
                                <div className="card-body">
                                    <h5 className="card-title">{user.dog_name}</h5>
                                    <p className="card-text">{user.dog_bio}</p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Age: {calculateAge(user.DOB)}</li>
                                    <li className="list-group-item">Size: {user.size}</li>
                                    <li className="list-group-item">Gender: {user.gender}</li>
                                    <li className="list-group-item">Fixed: {String(user.fixed)}</li>
                                    <li className="list-group-item">Owner: {user.owner_name}</li>
                                    <li className="list-group-item">{user.city} {user.state}</li>
                                </ul>
                                {String(user.profile_id) !== currentUser
                                    ? <Button onClick={handleConnect} value={user.profile_id} className="btn btn-info btn-sm">See more info</Button>
                                    : null 
                                }
                            </div>   
                        </div>      
                    )
                })}
                </div>  
            </div>
        )
    }
}
    