import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Notification from './Images/Notification.svg'
import Messages from "./Images/Messages.svg"
import "./Nav.css"
import Notifications from "react-notifications-menu";
import Button from 'react-bootstrap/Button';
import Logout from './Authenticate/Logout';

const DEFAULT_NOTIFICATION = {
    image:
      "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
    message: "Notification one.",
    detailPage: "/",
    receivedTime: "12h ago"
  };



export default function Nav() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [message, setMessage] = useState("");
    const [data, setData] = useState([DEFAULT_NOTIFICATION]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark text-white bg-success">
            <div>
                <NavLink className="navbar-brand" to="/">
                    Paw Wow
                </NavLink>
                <div className='d-flex'>
                <div className="d-flex flex-row align-items-md-center icons">
                    <div className="p-2 icon">
                        <Notifications
                        data={data}
                        header={{
                            title: "Notifications",
                            option: { text: "View All", onClick: () => console.log("Clicked") }
                        }}
                        markAsRead={(data) => {
                            console.log(data);
                        }}
                        />
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
            <Logout show={show} handleClose={handleClose} />
            <Button className="btn btn-info btn-sm" onClick={handleShow}>
                Logout
            </Button>
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

