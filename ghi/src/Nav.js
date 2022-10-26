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
} from 'cdbreact';

import { NavLink } from 'react-router-dom';


const Nav = (props) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>      
      <div style={{position: 'sticky', top: 0}}>
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
              <NavLink to="/">
              <CDBSidebarMenuItem   className={"pb-2"} icon="fa fa-arrow-left">Logout</CDBSidebarMenuItem>
            </NavLink>
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

