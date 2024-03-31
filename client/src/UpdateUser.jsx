import axios from "axios";
import { useEffect, useState } from "react";
import { addUser, updateUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
    const {id} = useParams()
    const [name, setName] = useState()
    const [licenseNumber, setlicenseNumber] = useState()
    const [age, setAge] = useState()
    const [dob, setDob] = useState()
    
    const users = useSelector(state => state.users.users)
    
    useEffect(()=> {
        const user = users.find(u => u.id === id)
        setName(user.name)
        setlicenseNumber(user.licenseNumber)
        setAge(user.age)
        setDob(user.dob)
    }, [])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3001/update/'+id, {name, email, age})
        .then(res => {
            dispatch(updateUser({id, name, licenseNumber, age ,dob}))
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    return ( 
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">License Number</label>
            <input
              type="number"
              placeholder="Enter License Number"
              className="form-control"
              value={licenseNumber}
              onChange={(e) => setlicenseNumber(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="number"
              placeholder="Enter Age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Dob</label>
            <input
              type="text"
              placeholder="Enter Dob"
              className="form-control"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
     );
}

export default UpdateUser;