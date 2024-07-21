import React from 'react';
import './loginPage.css';
import { Link, useNavigate } from 'react-router-dom';

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

    <h2 className='mt-5'>Full code on Github 
       <a href='https://github.com/Anas-Kharboutli/out-of-office-app'
      target='_blank' rel="noreferrer"> Link</a>
    </h2>

    <h2>
      Description of App and SQL Queries 
      <Link to='/description'> Show</Link>
    </h2>  

    <h5>P.S If SQL Database didn't render immediately please refresh after 5 sec.</h5>   
    </div>
  )
}

export default LoginPage
