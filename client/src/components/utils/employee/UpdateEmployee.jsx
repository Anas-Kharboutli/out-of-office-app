import React, { useState } from 'react';
import axios from 'axios';

const UpdateEmployee = ({ modalId }) => {

    const [ID,          setID]          = useState("");
    const [FullName,   setFullName]   = useState(""); 
    const [Subdivision, setSubdivision] = useState(""); 
    const [Position,    setPosition  ]  = useState(""); 

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const res = await axios.post('http://localhost:8080/api/update_employee', 
            { ID, FullName, Subdivision, Position });
    
          if (res.status === 200) {
            console.log(res);
            window.location.reload();
          }        
        } catch (error) {
            console.error('Failed to update Employee record:', error);
        }
      };

  return (
    <React.Fragment>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
        Update Employee
      </button>

      <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Employee Info</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>

              <div className="mb-1">
                  <label htmlFor={`id-${modalId}`} className="col-form-label">Employee ID</label>
                  <input
                    required
                    type="number"
                    className="form-control"
                    id={`id-${modalId}`}
                    value={ID}
                    onChange={(e) => setID(Number(e.target.value))}
                  />
                </div>

                <div className=" mb-1">
                <label htmlFor="full-name" className="col-form-label">Full Name</label>
                <input type="text" className="form-control" id="full-name"
                placeholder='Enter Full Name'
                value={FullName}
                onChange={(e) => setFullName(e.currentTarget.value)}
                />
              </div>
              <div className=" mb-1">
              <label htmlFor="Subdivision" className="col-form-label">Subdivision</label>
                <input type="text" className="form-control" id="Subdivision"
                placeholder='Enter Subdivision'
                value={Subdivision}
                onChange={(e) => setSubdivision(e.currentTarget.value)}   
                />
              </div>
              <div className=" mb-1">
              <label htmlFor="Position" className="col-form-label">Position</label>
              <select
                    className="form-select"
                    aria-label="Default select example"
                    id={'status-modalId'}
                    value={Position}
                    onChange={(e) => setPosition(e.currentTarget.value)}
                  >
                    <option value="">Select Position</option>
                    <option value="Associate">Associate</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Operations Manager">Operations Manager</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Project Manager">Project Manager</option>
                  </select>
              </div>
               
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default UpdateEmployee
