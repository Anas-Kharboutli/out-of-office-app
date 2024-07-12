import React, { useState } from 'react';
import axios from 'axios';


const AddEmployee = () => {
    const [full_name, setFull_name]             = useState(""); 
    const [subdivision, setSubdivision]         = useState(""); 
    const [position, setPosition  ]             = useState(""); 
    const [people_partner, setPeople_partner  ] = useState(""); 
    const [leave_balance, setLeave_balance  ]   = useState(21); 
    const [photo, setPhoto ]                    = useState(null); 

 const handleSubmit = async (e) => {

    e.preventDefault();

    try {
    const res = await axios.post('http://localhost:8080/api/add_employee', {full_name, subdivision, position, 
            people_partner, leave_balance, photo });

    if(res.status === 201) {
        console.log(res);
        window.location.reload();
    }        
    } catch (error) {
        console.log(error)
    }


 }
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
                value={full_name}
                onChange={(e) => setFull_name(e.currentTarget.value)}
                />
              </div>
              <div className=" mb-1">
              <label htmlFor="subdivision" className="col-form-label">Subdivision</label>
                <input required type="text" className="form-control" id="subdivision"
                placeholder='Enter subdivision'
                value={subdivision}
                onChange={(e) => setSubdivision(e.currentTarget.value)}   
                />
              </div>
              <div className=" mb-1">
              <label htmlFor="position" className="col-form-label">Position</label>
              <input 
                    required
                    type="text" 
                    className="form-control" 
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
              </div>

              <div className=" mb-1">
              <label htmlFor="people-partner" className="col-form-label">People Partner</label>
                  <input 
                    required
                    type="number" 
                    className="form-control" 
                    id="people-partner"
                    value={people_partner}
                    onChange={(e) => setPeople_partner(Number(e.target.value))}
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="leave-balance" className="col-form-label">Leave Balance</label>
                  <input 
                    required
                    type="number" 
                    className="form-control" 
                    id="leave-balance"
                    value={leave_balance}
                    onChange={(e) => setLeave_balance(e.target.value)}
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="photo" className="col-form-label">Photo (optional)</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    id="photo"
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
