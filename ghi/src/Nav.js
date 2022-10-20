import { NavLink, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Notifications from "./Images/Notifications.svg"
import "./Nav.css"

const displayNotification = (()=>{
    return (
        <span className="notification">
            "X wants to be friends with you"
        </span>
    )
}
)

export default function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark text-white bg-success">
            <div>
                <NavLink className="navbar-brand" to="/">
                    Paw Wow
                </NavLink>
                <div className="icons">
                    <div className="icon">
                        <img src={Notifications} className="iconImg" alt=""/>
                        <div className="counter">1 </div>
                    </div>
                </div>

            </div>
            <Navbar.Collapse className="me-auto" id="navbarSupportedContent">
                <nav className="me-auto mb-2 mb-lg-0">
                    <div className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="profile/friends">Friends</NavLink>
                    </div>
                </nav>
            </Navbar.Collapse>
        </nav>        
    )
}