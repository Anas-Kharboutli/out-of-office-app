import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SortIcon, AddLeaveRequest, CancelLeaveRequest  } from '../exports';

const LeaveRequests = () => {

  const [leaveRequests, setLeaveRequests] = useState([]);
  const [sortRows, setSortRows] = useState({ key: 'id', direction: 'ascending' });
  const [searchByNumber, setSearchByNumber] = useState("");
  const role = localStorage.getItem("role");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/get_all_leave`);
        setLeaveRequests(response.data);
      } catch (error) {
        console.error('Failed to fetch Leave Requests from MySQL:', error);
      }
    };

    fetchData();
  }, []);

  const sortedLeave = [...leaveRequests].sort((a, b) => {
    if (a[sortRows.key] < b[sortRows.key]) {
      return sortRows.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortRows.key] > b[sortRows.key]) {
      return sortRows.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });


  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortRows.key === key && sortRows.direction === 'ascending') {
      direction = 'descending';
    }
    setSortRows({ key, direction });
  };

  const filteredLeave = sortedLeave.filter(leave =>
    leave.ID.toString().toLowerCase().includes(searchByNumber.toLowerCase())
  );


  return (
    <React.Fragment>

      {role === 'employee' ?
      <div className='function-btns'>      
      <AddLeaveRequest modalId={"modal_4"}/>
      <CancelLeaveRequest modalId={"modal_5"}/>
      </div>
      :
      <></>
      }
     <div className='w-25 search-btn'>
        <input
          type="number"
          className="form-control"
          placeholder="Search By Request No."
          value={searchByNumber}
          onChange={(e) => setSearchByNumber(e.target.value.toString())}
        />
      </div>  
      
       <table className="table table-hover">
  <thead>
  <tr>
    <th scope="col">
    <SortIcon onClick={() => requestSort('ID')}/> Request Number </th>
    <th scope="col" >
    <SortIcon onClick={() => requestSort('Employee')}/> Employee </th>
    <th scope="col" >
    <SortIcon onClick={() => requestSort('AbsenceReason')}/> Absence Reason </th>
    <th scope="col" >
    <SortIcon onClick={() => requestSort('StartDate')}/> Start Date</th>
    <th scope="col" >
    <SortIcon onClick={() => requestSort('EndDate')}/> End Date</th>
    <th scope="col" >
    <SortIcon onClick={() => requestSort('Status')}/> Status</th>
    <th scope="col" >
    <SortIcon onClick={() => requestSort('Comment')}/> Comment</th>
  </tr>
  </thead>
  <tbody>
    {filteredLeave.map((leave) => (
      <tr key={leave.ID}>
         <th scope="row">{leave.ID}</th>
              <td>{leave.Employee}</td>
              <td>{leave.AbsenceReason}</td> 
              <td>{leave.StartDate}</td>
              <td>{leave.EndDate}</td> 
              <td style={{
                fontWeight: "600",
                color: "white",
                background: leave.Status === "Approved" || leave.Status === "Submitted" ? 'rgb(119, 207, 104)' : 'red'}}>
                  {leave.Status}</td>
              <td>{leave.Comment}</td>           
      </tr>
    ))}
  </tbody>
</table>
    </React.Fragment>
  )
}

export default LeaveRequests
