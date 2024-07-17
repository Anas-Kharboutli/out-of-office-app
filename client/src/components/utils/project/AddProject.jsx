import React, { useState } from 'react';
import axios from 'axios';

const AddProject = ({modalId}) => {

    const [ProjectType, setProjectType]       = useState(""); 
    const [StartDate, setStartDate]           = useState(""); 
    const [EndDate, setEndDate  ]             = useState(""); 
    const [ProjectManager, setProjectManager] = useState(""); 
    const [Comment, setComment  ]             = useState(""); 

    const handleSubmit = async (e) => {

        e.preventDefault();
    
        try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/add_new_project`, {ProjectType, StartDate, EndDate, 
            ProjectManager, Comment });
    
        if(res.status === 201) {
            console.log(res);
            window.location.reload();
        }        
        } catch (error) {
            console.log(error)
        }
     };
    

  return (
    <React.Fragment>
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
      Create New Project
    </button>

    <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">New Project</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>

            <div className=" mb-1">
              <label htmlFor="ProjectType" className="col-form-label">Project Type</label>
              <select
                  required
                  className="form-select"
                  aria-label="Default select example"
                  id={'status-modalId'}
                  value={ProjectType}
                  onChange={(e) => setProjectType(e.currentTarget.value)}
                >
                  <option value="">Select Type</option>
                  <option value="A">Type A</option>
                  <option value="B">Type B</option>
                  <option value="C">Type C</option>
                  <option value="D">Type D</option>
                </select>
            </div>

            <div className=" mb-1">
            <label htmlFor="StartDate" className="col-form-label">Start Date</label>
              <input required type="date" className="form-control" id="StartDate"
              placeholder='Enter Start Date'
              value={StartDate}
              onChange={(e) => setStartDate(e.currentTarget.value)}   
              />
            </div>

            <div className=" mb-1">
            <label htmlFor="EndDate" className="col-form-label">End Date</label>
              <input type="date" className="form-control" id="StartDate"
              placeholder='Enter End Date'
              value={EndDate}
              onChange={(e) => setEndDate(e.currentTarget.value)}   
              />
            </div>

            <div className="mb-1">
                <label htmlFor={`id-${modalId}`} className="col-form-label">Project Manager</label>
                <input
                  required
                  type="number"
                  className="form-control"
                  id={`id-${modalId}`}
                  value={ProjectManager}
                  onChange={(e) => setProjectManager(Number(e.target.value))}
                />
              </div>

            <div className=" mb-1">
            <label htmlFor="Comment" className="col-form-label">Comment (Optional)</label>
              <input type="text" className="form-control" id="Comment"
              placeholder='Type Comment if Any'
              value={Comment}
              onChange={(e) => setComment(e.currentTarget.value)}   
              />
            </div>
             
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
  )
}

export default AddProject
