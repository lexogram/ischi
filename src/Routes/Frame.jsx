/**
 * src/Routes/Frame.jsx
 */

import '../SCSS/outlet.scss'


import React, { useContext } from 'react';
import { Outlet } from "react-router-dom";
import { NavContext } from '../Contexts'

import { Menu } from '../Menu/Panel';

export const Frame = () => {
  return (
    <>
      <Menu /> {/* id is set to "menu" */}
      <div id="outlet">
        <Outlet />
      </div>
    </>
  );
};
