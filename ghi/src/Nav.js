import { Link } from 'react-router-dom';
import { useState } from 'react';
import Notification from './Images/Notification.svg'
import Messages from "./Images/Messages.svg"
// import Notifications from "react-notifications-menu";
import Logout from './Authenticate/Logout';
import MagicBell, { FloatingNotificationInbox } from '@magicbell/magicbell-react';

export default function Nav() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const username = localStorage.getItem('currentUser')

  return (
    <nav>
    <div className='wrapper'>
      <div className='sidebar'>
        <div className='paw-logo'>
          <Link to='/'><img src={require('./Images/pawow.png')}/></Link>
        </div>
        <div className='link-btn'>
          <Link to="/profile">
                <button className='home-btn'>Home</button>
          </Link>
          <Link to="profile/friends">
                <button className='friends-btn'>Friends</button>
          </Link>
          <Logout show={show} handleClose={handleClose} />
            <button className="logout-btn" onClick={handleShow}>Logout</button>
        </div>
          {/* <div className='d-flex'>
          <div className="d-flex flex-row align-items-md-center icons">
              <div className="p-2 icon">
                  <MagicBell apiKey="96c11587b6ac4027795611e453cdcc6fa19afa23" userExternalId="u001">
                  {(props) => <FloatingNotificationInbox height={500} {...props} />}
                  </MagicBell>
              </div>
              </div> */}
        <div className="d-flex flex-row align-items-md-center icons">
          <div className="p-2 icon">
            <img src={Messages} className="iconImg" alt=""/>
              <div className="d-flex p-1 align-items-center justify-content-center mx-auto position-absolute font-weight-bold counter">99+</div>
          </div>
        </div>
          {/* </div> */}
      </div>
    </div> 
    </nav>      
  )  
}

