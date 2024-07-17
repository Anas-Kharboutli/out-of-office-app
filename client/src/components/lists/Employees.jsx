import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AddEmployee, UpdateStatus, UpdateEmployee } from '../exports';

export const SortIcon = ({ onClick }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" 
  className="bi bi-sort-down" viewBox="0 0 16 16"
  onClick={onClick}
  style={{ cursor: 'pointer' }}
  >
<path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
</svg>
);

const Employees = () => {

  const [employeesList, setEmployeesList] = useState([]);
  const [sortRows, setSortRows] = useState({ key: 'id', direction: 'ascending' });
  const [searchByName, setSearchByName] = useState("");
  const role = localStorage.getItem("role");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/get_all_employees`);
        setEmployeesList(response.data);
      } catch (error) {
        console.error('Failed to fetch Employees from MySQL:', error);
      }
    };

    fetchData();
  }, []);

  const sortedEmployees = [...employeesList].sort((a, b) => {
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

  const filteredEmployees = sortedEmployees.filter(employee =>
    employee.FullName.toLowerCase().includes(searchByName.toLowerCase())
  );


  return (
    <React.Fragment>
      {role === "hr" ? 
       <div className='function-btns'>
       <AddEmployee /> 
       <UpdateStatus modalId={"modal_2"} />
       <UpdateEmployee modalId={"modal_3"} />
       </div> 
       :
       <></>
    }
      <div className='search-btn w-25'>
        <input
          type="text"
          className="form-control"
          placeholder="Search By Name"
          value={searchByName}
          onChange={(e) => setSearchByName(e.target.value)}
        />
      </div>

  <table className="table table-hover">
  <thead>
  <tr>
    <th scope="col">
    <SortIcon onClick={() => requestSort('ID')}/> Employee ID </th>
    <th scope="col" >
    <SortIcon onClick={() => requestSort('FullName')}/> Full Name </th>
    <th scope="col" >
    <SortIcon onClick={() => requestSort('Subdivision')}/> Subdivision </th>
    <th scope="col" >
    <SortIcon onClick={() => requestSort('Position')}/> Position</th>
    <th scope="col" >
    <SortIcon onClick={() => requestSort('Status')}/> Status</th>
    <th scope="col" >
    <SortIcon onClick={() => requestSort('People_Partner')}/> People Partner</th>
    <th scope="col" >
    <SortIcon onClick={() => requestSort('Leave_Balance')}/> Leave Balance</th>
    <th scope="col" >
    Photo</th>
  </tr>
  </thead>
  <tbody>
    {filteredEmployees.map((employee) => (
      <tr key={employee.ID}>
         <th scope="row">{employee.ID}</th>
              <td>{employee.FullName}</td>
              <td>{employee.Subdivision}</td> 
              <td>{employee.Position}</td>
              <td style={{
                fontWeight: "600",
                color: "white",
                background: employee.Status === "inactive" ? 'red' : 'rgb(119, 207, 104)'}}>
                  {employee.Status}</td> 
              <td>{employee.People_Partner}</td> 
              <td>{employee.Leave_Balance}</td> 
              <td>{employee.photo ? (
              <img src={`data:image/jpeg;base64,${employee.photo}`} width={20} height={20} alt='Employee' />
              ) : (
              <img src='/standard-img.jpg' width={20} height={20} alt='Default' /> )} 
              </td>
      </tr>
    ))}
    
  </tbody>
</table>
    </React.Fragment>
  )
}

export default Employees
