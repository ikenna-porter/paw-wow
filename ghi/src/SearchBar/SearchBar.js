import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SearchBar() {
    const [ users, setUsers ] = useState([]);

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
                setUsers(data);
            }
        }
        if (users.length === 0) {
            getUsers();
        }
    }, [])

    return (
        <div>
            <form>
                <div className="input-group mb-3 p-4">
                    <input
                        className="form-control me-2" 
                        type="search" 
                        placeholder="Search" 
                        aria-label="Search"
                    />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </div>    
            </form>
            <h3>Other Pups</h3>
            <div className="row">
            {users.map(user => {
                return(
                    <div key={user.profile_id} className="col-4">
                        <div className="card" style={{width: "18rem"}}>
                            <img src={user.img} className="card-img-top" alt="..." />
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
                            <Link to="#" className="btn btn-primary">Connect</Link>
                        </div>   
                    </div>      
                )
            })}
            </div>  
        </div>
    )
}