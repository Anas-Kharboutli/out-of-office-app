import React from 'react';
import './navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {

  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  let navContent;
  
  if(role === "employee") {
    navContent = 
    <div className='navbar'>
    <ul className="nav flex-column">
     
      <li className="nav-item">
        <NavLink className="nav-link" to='/projects'>Projects List</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/leaveRequest">Leave Requests List</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/approvalRequest">Approval Requests List</NavLink>
      </li>
      <button
        className='btn btn-warning w-50 mt-3'
        onClick={() =>{ localStorage.removeItem("role");
        navigate('/');
        window.location.reload();              
      }}>
      Logout
      </button>
    </ul>      
  </div>
  } else if (role === "hr" || role === "projectManager") {

    navContent =  
    <div className='navbar'>
    <ul className="nav flex-column">
      <li className="nav-item">
        <NavLink className="nav-link" to="/employees">Employees List</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to='/projects'>Projects List</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/leaveRequest">Leave Requests List</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/approvalRequest">Approval Requests List</NavLink>
      </li>
          <button
          className='btn btn-warning w-50 mt-3'
          onClick={() =>{ localStorage.removeItem("role");
           navigate('/');
           window.location.reload();              
          }}>
            Logout
          </button>
    </ul>  
        </div>
  } else if ( role === null){
    navContent = <></>
  }

  return (
   <React.Fragment>
   {navContent}
   </React.Fragment>
  )
}

export default Navbar
