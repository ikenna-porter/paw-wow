import { NavLink, Link } from 'react-router-dom';
import Notifications from "./Images/Notifications.svg"
import Messages from "./Images/Messages.svg"
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
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    Paw Wow
                </NavLink>
                <div className='d-flex'>
                <div className="d-flex flex-row align-items-md-center icons">
                    <div className="p-2 icon">
                        <img src={Notifications} className="iconImg" alt=""/>
                        <div className="d-flex p-1 align-items-center justify-content-center mx-auto position-absolute font-weight-bold counter">99+</div>
                    </div>
                    </div>
                    <div className="d-flex flex-row align-items-md-center icons">
                    <div className="p-2 icon">
                        <img src={Messages} className="iconImg" alt=""/>
                        <div className="d-flex p-1 align-items-center justify-content-center mx-auto position-absolute font-weight-bold counter">99+</div>
                    </div>
                </div>
                </div>
            </div>
        </nav>        
    )
}