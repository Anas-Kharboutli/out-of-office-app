import React, { useState } from 'react';
import axios from 'axios';


const ApprovalUpdate = ({modalId}) => {

    const [LeaveRequestId, setLeaveRequestId] = useState("");
    const [Status, setStatus] = useState(""); 
    const [Comment, setComment] = useState(""); 

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const res = await axios.post('http://localhost:8080/api/update_approval', 
            { LeaveRequestId, Status, Comment });
    
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
      Update Approval Request
    </button>

    <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Approval Request</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>

            <div className="mb-1">
                <label htmlFor={`id-${modalId}`} className="col-form-label">Leave Request ID</label>
                <input
                  required
                  type="number"
                  className="form-control"
                  id={`id-${modalId}`}
                  value={LeaveRequestId}
                  onChange={(e) => setLeaveRequestId(Number(e.target.value))}
                />
              </div>

              <div className="mb-1">
                <label htmlFor={`status-${modalId}`} className="col-form-label">Decision</label>
                <select
                  required
                  className="form-select"
                  aria-label="Default select example"
                  id={`decision-${modalId}`}
                  value={Status}
                  onChange={(e) => setStatus(e.currentTarget.value)}
                >
                  <option value="">Select Decision</option>
                  <option value="Approved">Approve</option>
                  <option value="Rejected">Reject</option>
                </select>
              </div>

              <div className="mb-1">
                <label htmlFor={`id-${modalId}`} className="col-form-label">Comment (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  id={`Comment-${modalId}`}
                  value={Comment}
                  onChange={(e) => setComment(e.target.value)}
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

export default ApprovalUpdate
