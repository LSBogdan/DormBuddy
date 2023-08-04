import React from 'react';
import NavBar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const RootPage = () => {
    return (
      <>
        <NavBar />
        <Outlet />
      </>
    )
  
  }
  
  export default RootPage;