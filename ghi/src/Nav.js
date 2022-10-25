import { Link } from 'react-router-dom';
import { useState } from 'react';
import Notification from './Images/Notification.svg'
import Messages from "./Images/Messages.svg"
import dogMessage from "./Images/dogMessage.svg"
import paw from "./Images/paw.svg"
import Logout from './Authenticate/Logout';

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
          <NavLink exact to="/profile" className="activeClicked">
            <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="fa fa-comments" suffix={<CDBBadge></CDBBadge>}>
              Messages
            </CDBSidebarMenuItem>
          </NavLink>  
          <NavLink exact to="profile/friends" className="activeClicked" >
            <CDBSidebarMenuItem icon="dog" suffix={<CDBBadge color="success"></CDBBadge>}>Friends</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="search" className="activeClicked" >
            <CDBSidebarMenuItem icon="" suffix={<CDBBadge color="success"></CDBBadge>}>Search</CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: 'center' }}>
        <NavLink exact to="/" className="activeClicked">
          <CDBSidebarMenuItem className="footer" icon="fa fa-arrow-left">Logout</CDBSidebarMenuItem>
        </NavLink>
      </CDBSidebarFooter>
    </CDBSidebar>
  </div>
  </div>
);
};


export default Nav;


