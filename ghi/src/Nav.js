import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Notification from './Images/Notification.svg'
import Messages from "./Images/Messages.svg"
import "./Nav.css"
import MagicBell, { FloatingNotificationInbox } from '@magicbell/magicbell-react';


export default function Nav() {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark text-white bg-success">
            <div>
                <NavLink className="navbar-brand" to="/">
                    Paw Wow
                </NavLink>
                <div className='d-flex'>
                <div className="d-flex flex-row align-items-md-center icons">
                    <div className="p-2 icon">
                        <MagicBell apiKey="96c11587b6ac4027795611e453cdcc6fa19afa23" userExternalId="u001">
                        {(props) => <FloatingNotificationInbox height={500} {...props} />}
                        </MagicBell>
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

