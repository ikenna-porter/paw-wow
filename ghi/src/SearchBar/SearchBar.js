import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [standardResults, setStandardResults] = useState([]);
    const userCity = localStorage.getItem('userCity');
    const userState = localStorage.getItem('userState');
    const currentUser = localStorage.getItem('profileId');
    const navigate = useNavigate();

    function calculateAge(DOB, category=null) {
        if (DOB) {
            let arr = DOB.split('-');
            let newDOB = arr.map(num => parseInt(num));
            let y = newDOB[0];
            let m = newDOB[1];
            const date = new Date();
            let ageY = date.getFullYear() - y;
            let ageM = (date.getMonth() + 1) - m;

            if (!category) {
                if (ageM === 0) {
                    return `${ageY} years`
                } else if (ageM < 0) {
                    return `${ageY - 1} years, ${12 + ageM} months`
                } else if (ageM > 0) {
                    return `${ageY} years, ${ageM} months`
                }
            } else if (category && ageY === 0) {
                return "puppy"
            } else if (category && ageY < 10 && ageY > 0) {
                return "adult"
            } else if (category && ageY >= 10) {
                return "senior"
            }
        }
    }

    useEffect(() => {
        async function getUsers() {
            const response = await fetch('http://localhost:8100/api/profiles', { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setUsers(data.filter(user => user.profile_id !== currentUser));
                setStandardResults(data.filter(user => user.city === userCity && user.state === userState));
                setFilteredUsers(data.filter(user => user.city === userCity && user.state === userState));
            }
        }
        if (users.length === 0) {
            getUsers();
        }
    }, [currentUser])

    const handleSearch = (event) => {
        let searchInput = event.target.value;
        if (searchInput.length === 0) {
            setFilteredUsers(standardResults);
        } else {
            let filteredResults = [];
            users.forEach(user => {
                let dog = user.dog_name.toLowerCase();
                if (dog.includes(searchInput) || user.dog_name.includes(searchInput) || user.city.includes(searchInput)) {
                    filteredResults.push(user);
                }
            })
            setFilteredUsers(filteredResults);
        }
    }

    const handleFixedSearch = (event) => {
        let fixedResults = [];
        users.forEach(user => {
            if (user.fixed) {
                fixedResults.push(user)
            }
        })
        setFilteredUsers(fixedResults)
    }

    const handleSizeSearch = (event) => {
        let sizeResults = [];
        users.forEach(user => {
            if (user.size === event.target.value) {
                sizeResults.push(user)
            }
        })
        setFilteredUsers(sizeResults);
    }

    const handleGenderSearch = (event) => {
        let genderResults = [];
        users.forEach(user => {
            if (user.gender === event.target.value) {
                genderResults.push(user)
            }
        })
        setFilteredUsers(genderResults);
    }

    const handleAgeSearch = (event) => {
        let ageCategoryResults = []
        let category = true;
        users.forEach(user => {
            if (calculateAge(user.DOB, category=category) === event.target.value) {
                ageCategoryResults.push(user)
            } 
        })
        setFilteredUsers(ageCategoryResults);
    }

    const handleConnect = (event) => {
        event.preventDefault();
        navigate(`/profile/${event.target.value}`);
    }

    if (filteredUsers.length === 0) {
        return (
            <div>
                <form onSubmit={event => { event.preventDefault() }}>
                    <div className="input-group mb-3 p-4">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={handleSearch}
                        />
                    </div>
                </form>
            </div>
        )
    } else {
        return (
            <div>
                <form onSubmit={event => { event.preventDefault() }}>
                    <div className="input-group mb-3 p-4">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={handleSearch}
                        />
                    </div>
                </form>
                <div className="container p-4">
                    <button
                        className="btn btn-light close-btn btn-md" 
                        type="button" 
                        onClick={handleFixedSearch}
                    >
                        Fixed
                    </button>
                    <button
                        value="Small"
                        className="btn btn-light close-btn btn-md" 
                        type="button" 
                        onClick={handleSizeSearch}
                    >
                        Small
                    </button>
                    <button
                        value="Medium"
                        className="btn btn-light close-btn btn-md" 
                        type="button" 
                        onClick={handleSizeSearch}
                    >
                        Medium
                    </button>
                    <button
                        value="Large"
                        className="btn btn-light close-btn btn-md" 
                        type="button" 
                        onClick={handleSizeSearch}
                    >
                        Large
                    </button>
                    <button
                        value="Male"
                        className="btn btn-light close-btn btn-md" 
                        type="button" 
                        onClick={handleGenderSearch}
                    >
                        Male
                    </button>
                    <button
                        value="Female"
                        className="btn btn-light close-btn btn-md" 
                        type="button" 
                        onClick={handleGenderSearch}
                    >
                        Female
                    </button>
                    <button
                        value="puppy"
                        className="btn btn-light close-btn btn-md" 
                        type="button" 
                        onClick={handleAgeSearch}
                    >
                        Puppy
                    </button>
                    <button
                        value="adult"
                        className="btn btn-light close-btn btn-md" 
                        type="button" 
                        onClick={handleAgeSearch}
                    >
                        Adult
                    </button>
                    <button
                        value="senior"
                        className="btn btn-light close-btn btn-md" 
                        type="button" 
                        onClick={handleAgeSearch}
                    >
                        Senior
                    </button>
                </div>
                <div className="container p-4 text-center">
                    <img src={require('../Images/other.png')} className='pb-3 img-responsive' />
                    <div className="row row-cols-1 row-cols-md-4 g-3">
                        {filteredUsers.map(user => {
                            return (
                                <div key={user.profile_id} className="col-3">
                                    <div className="card text-center h-100" style={{ width: "14rem" }}>
                                        <div className="card-header">{user.dog_name}</div>
                                        {
                                            user.img ?
                                                <div className="search-card-image">
                                                    <img src={user.img} className='profile-pic' alt="..." />
                                                </div>
                                                :
                                                <img className='card-img-top' src={require('../Images/dogoutline.png')} />
                                        }
                                        <div className="card-body">
                                            <h4 className="card-title">About {user.dog_name}:</h4>
                                            <blockquote className="blockquote mb-3">{user.dog_bio}</blockquote>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">{calculateAge(user.DOB)}</li>
                                                <li className="list-group-item">{user.size}</li>
                                                <li className="list-group-item">{user.gender}</li>
                                                {user.fixed
                                                    ? <li className="list-group-item">Fixed</li>
                                                    : null
                                                }
                                                <li className="list-group-item">{user.city} {user.state}</li>
                                            </ul>
                                        </div>
                                        {String(user.profile_id) !== currentUser
                                            ? <Button
                                                onClick={handleConnect} 
                                                value={user.profile_id} 
                                                className="btn btn-light form-btn btn-md"
                                            >
                                                See more info
                                            </Button>
                                            : null
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
