import { Link } from 'react-router-dom';
import { useState } from 'react';
import Notification from './Images/Notification.svg'
import Messages from "./Images/Messages.svg"
import dogMessage from "./Images/dogMessage.svg"
import paw from "./Images/paw.svg"
// import Notifications from "react-notifications-menu";
import Logout from './Authenticate/Logout';
// import MagicBell, { FloatingNotificationInbox } from '@magicbell/magicbell-react';

// Jason's Magic Sidebar!
import {CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBBadge,
} from 'cdbreact';

import { NavLink } from 'react-router-dom';


const Nav = (props) => {
  return (
    <div>
    <div style={{ position: 'absolute', display: 'flex', height: '100vh'}}>
    <CDBSidebar textColor="#fff" backgroundColor="#333">
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-2x" onClick={(() => props.setResize(!props.resize))}></i>}>
      <div className="container ">
            <img
              src={require("./Images/paw.png")}
              className="menuLogo"
              alt=""
            />
          </div>
      </CDBSidebarHeader>

      <CDBSidebarContent className="sidebar-content">
        <CDBSidebarMenu>
          <NavLink exact to="/profile" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
          </NavLink>
          <CDBSidebarMenuItem icon="fa fa-comments" suffix={<CDBBadge>364</CDBBadge>}>
                Messages
              </CDBSidebarMenuItem>
          <NavLink exact to="profile/friends" activeClassName="activeClicked" >
            <CDBSidebarMenuItem icon="dog" suffix={<CDBBadge color="success">2</CDBBadge>}>Friends</CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: 'center' }}>
        <div
          style={{
            padding: '20px 5px',
          }}
        >
          Paw-Wow!
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>
  </div>
  </div>
);
};

export default Nav;

// const DEFAULT_NOTIFICATION = {
//     image:
//       "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
//     message: "Notification one.",
//     detailPage: "/",
//     receivedTime: "12h ago"
//   };



// export default function Nav() {
//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//   return (
//     <nav>
//     <div className='wrapper'>
//       <div className='sidebar'>
//         <div className='paw-logo'>
//           <Link to='/'><img src={require('./Images/pawow.png')}/></Link>
//         </div>
//         <div className='link-btn'>
//           <Link to="/profile">
//                 <button className='home-btn'>Home</button>
//           </Link>
//           <Link to="profile/friends">
//                 <button className='friends-btn'>Friends</button>
//           </Link>
//           <Logout show={show} handleClose={handleClose} />
//             <button className="logout-btn" onClick={handleShow}>Logout</button>
//         </div>
//         <div className="d-flex flex-row align-items-md-center icons">
//           <div className="p-2 icon">
//             <img src={dogMessage} className="iconImg" alt=""/>
//               <div className="d-flex p-1 align-items-right justify-content-center mx-auto position-absolute font-weight-bold counter">99+</div>
//           </div>
//         </div>

//       </div>
//     </div> 
//     </nav>      
//   )  
// }

