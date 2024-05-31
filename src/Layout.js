import { Outlet, Link } from "react-router-dom";
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import NavbarDesktop from './components/NavbarDesktop';
import NavbarMobile from './components/NavbarMobile';
import HeaderMobile from './components/HeaderMobile'

const Layout = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  
  return (
    <>

      {isDesktop ? null : <HeaderMobile />}

      <div>
        {isDesktop ? <NavbarDesktop /> : <NavbarMobile />}
      </div>

      <Outlet />
    </>
  )
};

export default Layout;