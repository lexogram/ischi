/**
 * src/Routes/Frame.jsx
 */


import React, { useContext } from 'react';
import { Outlet } from "react-router-dom";
import { NavContext } from '../Contexts'

import { Menu } from '../Pages/Menu';

export const Frame = () => {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
};
