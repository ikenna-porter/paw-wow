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
          <NavLink exact to="/profile">
            <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/messages">
          <CDBSidebarMenuItem icon="fa fa-comments" suffix={<CDBBadge>364</CDBBadge>}>
                Messages
              </CDBSidebarMenuItem>
              </NavLink>
          <NavLink exact to="profile/friends">
            <CDBSidebarMenuItem icon="dog" suffix={<CDBBadge color="success">2</CDBBadge>}>Friends</CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: 'center' }}>
      <NavLink exact to="/">
            <CDBSidebarMenuItem className="footer" icon="fa fa-arrow-left">Logout</CDBSidebarMenuItem>
          </NavLink>
      </CDBSidebarFooter>
    </CDBSidebar>
  </div>
  </div>
);
};


export default Nav;

