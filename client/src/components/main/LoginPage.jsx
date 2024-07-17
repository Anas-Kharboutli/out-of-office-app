import React from 'react';
import './loginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const navigate = useNavigate();

  const handleClick = (role) => {
  localStorage.setItem("role", role);
  };

  return (
    <div className='login-container'>

      <h1>Welcome To Out of Office App</h1>

      <h4>Login as:</h4>


    <div className="btn-group" role="group" aria-label="Basic example">
     <button type="button" className="btn btn-primary"
     onClick={() => {handleClick('employee'); navigate('/projects');}}
     
     >Employee</button>
     <button type="button" className="btn btn-primary"
     onClick={() => {handleClick('hr'); navigate('/employees');}}
     >HR Manager</button>
     <button type="button" className="btn btn-primary"
     onClick={() => {handleClick('projectManager'); navigate('/employees');}}
     >Project Manager</button>
    </div>
      
    </div>
  )
}

export default LoginPage
