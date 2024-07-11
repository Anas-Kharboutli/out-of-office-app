import React from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>

<ul className="nav flex-column">
  <li className="nav-item">
    <NavLink className="nav-link" to="/employees">Active</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" to='/projects'>Projects</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" to="/leaveRequest">Leave Request</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" to="/approvalRequest">Approval Request</NavLink>
  </li>
</ul>
      
    </div>
  )
}

export default Navbar
