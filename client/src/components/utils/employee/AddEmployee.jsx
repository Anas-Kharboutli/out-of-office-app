import React, { useState } from 'react';
import axios from 'axios';


const AddEmployee = () => {
    const [FullName, setFullName]             = useState(""); 
    const [Subdivision, setSubdivision]         = useState(""); 
    const [Position, setPosition  ]             = useState(""); 
    const [People_Partner, setPeople_Partner  ] = useState(""); 
    const [Leave_Balance, setLeave_Balance  ]   = useState(21); 
    const [Photo, setPhoto ]                    = useState(null); 

 const handleSubmit = async (e) => {

    e.preventDefault();

    try {
    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/add_employee`, {FullName, Subdivision, Position, 
            People_Partner, Leave_Balance, Photo });

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
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add New Employee</button>

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">New Employee</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className=" mb-1">
                <label htmlFor="full-name" className="col-form-label">Full Name</label>
                <input required type="text" className="form-control" id="full-name"
                placeholder='Enter Full Name'
                value={FullName}
                onChange={(e) => setFullName(e.currentTarget.value)}
                />
              </div>
              <div className=" mb-1">
              <label htmlFor="Subdivision" className="col-form-label">Subdivision</label>
                <input required type="text" className="form-control" id="Subdivision"
                placeholder='Enter Subdivision'
                value={Subdivision}
                onChange={(e) => setSubdivision(e.currentTarget.value)}   
                />
              </div>
              <div className=" mb-1">
              <label htmlFor="Position" className="col-form-label">Position</label>
              <select
                    required
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

              <div className=" mb-1">
              <label htmlFor="people-partner" className="col-form-label">People Partner</label>
                  <input 
                    required
                    type="number" 
                    className="form-control" 
                    id="people-partner"
                    value={People_Partner}
                    onChange={(e) => setPeople_Partner(Number(e.target.value))}
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="leave-balance" className="col-form-label">Leave Balance</label>
                  <input 
                    required
                    type="number" 
                    className="form-control" 
                    id="leave-balance"
                    value={Leave_Balance}
                    onChange={(e) => setLeave_Balance(e.target.value)}
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="Photo" className="col-form-label">Photo (optional)</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    id="Photo"
                    onChange={(e) => setPhoto(e.target.files)}
                  />
                </div>

                <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary"
            >Confirm</button>
          </div>
            </form>
          </div>
         
        </div>
      </div>
    </div>
    </React.Fragment>
  )
}

export default AddEmployee
