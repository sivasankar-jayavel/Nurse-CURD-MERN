import axios from "axios";
import { useState } from "react";
import { addUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateUser() {

    const [name, setName] = useState()
    const [licenseNumber, setlicenseNumber] = useState()
    const [age, setAge] = useState()
    const [dob, setDob] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/create', {name, licenseNumber, age,dob})
        .then(res => {
            dispatch(addUser(res.data))
            navigate('/')
        })
        .catch(err => console.log(err))
    }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">License Number</label>
            <input
              type="number"
              placeholder="Enter License Number"
              className="form-control"
              onChange={(e) => setlicenseNumber(e.target.value)}
            />
          </div>
         <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="text"
              placeholder="Enter Age"
              className="form-control"
              onChange={(e) => setAge(e.target.value)}
            />
          </div> 
         <div className="mb-2">
            <label htmlFor="">DOB</label>
            <input
              type="text"
              placeholder="Enter DOB"
              className="form-control"
              onChange={(e) => setDob(e.target.value)}
            />
          </div> 
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
