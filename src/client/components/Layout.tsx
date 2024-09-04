import React from 'react';
import NavBar from './NavBar'; // Adjust the import path as needed
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return(
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </>
  ) 
};

export default Layout;
