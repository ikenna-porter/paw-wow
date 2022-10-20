import { NavLink, Link } from 'react-router-dom';
import Notifications from "./Images/Notifications.svg"
import "./Nav.css"

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
                        <div className="counter">1 </div>
                </div>
            </div>
            </div>
        </nav>        
    )
}