import {CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import Logout from './Authenticate/Logout';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';



const Nav = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className='position-absolute top-0' style={{display: 'flex', flexDirection: 'column'}}>      
      <div className='v-100' style={{height: '100vh', position: 'sticky', top: 0}}>
        <CDBSidebar className="totalSidebar" textColor="#fff">
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
              <NavLink to="/profile" >
                <CDBSidebarMenuItem className={"pb-2"} icon="user">Profile</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="messages">
                <CDBSidebarMenuItem className={"pb-2"} icon="fa fa-comments">
                  Messages
                </CDBSidebarMenuItem>
              </NavLink>  
              <NavLink to="profile/friends">
                <CDBSidebarMenuItem className={"pb-2"} icon="dog">Friends</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="search">
                <CDBSidebarMenuItem className={"pb-2"} icon="search">Search</CDBSidebarMenuItem>
              </NavLink>
              <div className="text-center">
                  <Logout show={show} handleClose={handleClose} />
                    <button className="logout-btn text-center" onClick={handleShow}>
                      Logout
                    </button>
              </div>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
      <div style={{height: '100vh', backgroundColor: '#C0DECE'}}>
        {/* Position Sticky will not work if it does not have sibling elements.*/}
      </div>
    </div>
  );
};


export default Nav;

