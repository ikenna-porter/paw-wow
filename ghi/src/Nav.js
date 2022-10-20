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
                <div className="icons">
                    <div className="icon">
                        <img src={Notifications} className="iconImg" alt=""/>
                        <div className="counter">1</div>
                    </div>
                    <div className="icon">
                        <img src={Messages} className="iconImg" alt=""/>
                        <div className="counter">5</div>
                    </div>
                </div>
            </div>
        </nav>        
    )
}