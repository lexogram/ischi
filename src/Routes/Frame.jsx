/**
 * src/Routes/Frame.jsx
 */

import '../SCSS/outlet.scss'


import React, { useContext } from 'react';
import { Outlet } from "react-router-dom";
import { NavContext } from '../Contexts'

import { Menu } from '../Menu';

export const Frame = () => {
  return (
    <>
      <Menu />
      <div id="outlet">
        <Outlet />
      </div>
    </>
  );
};
