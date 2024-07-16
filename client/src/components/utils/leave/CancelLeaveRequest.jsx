import React, { useState } from 'react';
import axios from 'axios';

const CancelLeaveRequest = ({ modalId }) => {

  const [ID, setID] = useState("");
  const [Status, setStatus] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8080/api/cancel_leave-Request', 
        { ID, Status });

      if (res.status === 200) {
        console.log(res);
        window.location.reload();
      }        
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
      Update Existing Request
    </button>

    <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Leave Request</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>

            <div className="mb-1">
                <label htmlFor={`id-${modalId}`} className="col-form-label">Request Number</label>
                <input
                  required
                  type="number"
                  className="form-control"
                  id={`id-${modalId}`}
                  value={ID}
                  onChange={(e) => setID(Number(e.target.value))}
                />
              </div>

              <div className="mb-1">
                <label htmlFor={`status-${modalId}`} className="col-form-label">Status</label>
                <select
                  required
                  className="form-select"
                  aria-label="Default select example"
                  id={`status-${modalId}`}
                  value={Status}
                  onChange={(e) => setStatus(e.currentTarget.value)}
                >
                  <option value="">Change Status</option>
                  <option value="Canceled">Canceled</option>
                </select>
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

export default CancelLeaveRequest
