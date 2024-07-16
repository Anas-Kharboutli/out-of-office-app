import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SortIcon, ApprovalUpdate } from '../exports';

const ApprovalRequest = () => {

  const [approvalRequests, setApprovalRequests] = useState([]);
  const [sortRows, setSortRows] = useState({ key: 'id', direction: 'ascending' });
  const [searchByNumber, setSearchByNumber] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/get_all_approval');
        setApprovalRequests(response.data);
      } catch (error) {
        console.error('Failed to fetch Approval Requests from MySQL:', error);
      }
    };

    fetchData();
  }, []);

  const sortedApproval = [...approvalRequests].sort((a, b) => {
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

  const filteredApproval = sortedApproval.filter(approval =>
    approval.ID.toString().toLowerCase().includes(searchByNumber.toLowerCase())
  );




  return (
    <React.Fragment>

      <ApprovalUpdate modalId={"modal_6"}/>
      <div className='w-25'>
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
    <SortIcon onClick={() => requestSort('Employee')}/> Approver ID </th>
    <th scope="col" >
    <SortIcon onClick={() => requestSort('LeaveRequest')}/> Leave Request ID </th>
    <th scope="col" >
    <SortIcon onClick={() => requestSort('Status')}/> Status</th>
    <th scope="col" >
    <SortIcon onClick={() => requestSort('Comment')}/> Comment</th>
  </tr>
  </thead>
  <tbody>
    {filteredApproval.map((approval) => (
      <tr key={approval.ID}>
         <th scope="row">{approval.ID}</th>
              <td>{approval.Approver}</td>
              <td>{approval.LeaveRequest}</td> 
              <td>{approval.Status}</td>
              <td>{approval.Comment}</td>         
      </tr>
    ))}
  </tbody>
</table>

    </React.Fragment>
  )
}

export default ApprovalRequest
