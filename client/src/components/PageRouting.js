import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Employees, Projects, LeaveRequest, ApprovalRequest, LoginPage } from './exports';

export const PageRouting = () => {
  return (
    <Routes>
        <Route path='/'  exact         element={<LoginPage/>} /> 
        <Route path='/employees'       element={<Employees/>} /> 
        <Route path='/projects'        element={<Projects/>} /> 
        <Route path='/leaveRequest'    element={<LeaveRequest/>} /> 
        <Route path='/approvalRequest' element={<ApprovalRequest/>} />      
    </Routes>
  )
}


export default PageRouting;




