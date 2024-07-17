import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SortIcon, AddProject, ProjectStatus } from '../exports';


const Projects = () => {

  const [projectsList, setProjectsList] = useState([]);
  const [sortRows, setSortRows] = useState({ key: 'id', direction: 'ascending' });
  const [searchByNumber, setSearchByNumber] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/get_all_projects`);
        setProjectsList(response.data);
      } catch (error) {
        console.error('Failed to fetch Leave Requests from MySQL:', error);
      }
    };

    fetchData();
  }, []);

  const sortedProjects = [...projectsList].sort((a, b) => {
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

  const filteredProject = sortedProjects.filter(leave =>
    leave.ID.toString().toLowerCase().includes(searchByNumber.toLowerCase())
  );


  return (
    <React.Fragment>
      {role === "projectManager" ?  
      <div className='function-btns'>
      <AddProject modalId={"modal_6"} />
      <ProjectStatus modalId={"modal_7"} />
      </div> 
      : <></>
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
    <SortIcon onClick={() => requestSort('ID')}/> Project ID </th>
    <th scope="col" >
    <SortIcon onClick={() => requestSort('ProjectType')}/> Project Type </th>
    <th scope="col" >
    <SortIcon onClick={() => requestSort('StartDate')}/> Start Date </th>
    <th scope="col" >
    <SortIcon onClick={() => requestSort('EndDate')}/> End Date</th>
    <th scope="col" >
    <SortIcon onClick={() => requestSort('ProjectManager')}/>Project Manager</th>
    <th scope="col" >
    <SortIcon onClick={() => requestSort('Status')}/> Status</th>
    <th scope="col" >
    <SortIcon onClick={() => requestSort('Comment')}/> Comment</th>
  </tr>
  </thead>
  <tbody>
    {filteredProject.map((project) => (
      <tr key={project.ID}>
         <th scope="row">{project.ID}</th>
              <td>{project.ProjectType}</td>
              <td>{project.StartDate}</td> 
              <td>{project.EndDate}</td> 
              <td>{project.ProjectManager}</td> 
              <td style={{
                fontWeight: "600",
                color: "white",
                background: project.Status === "inactive" ? 'red' : 'rgb(119, 207, 104)'}}>
                  {project.Status}</td>
              <td>{project.Comment}</td>           
      </tr>
    ))}
  </tbody>
</table>
    </React.Fragment>
  )
}

export default Projects
