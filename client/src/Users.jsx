import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "./redux/userSlice";


function Users() {

  const users = useSelector(state => state.users.users)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/deleteuser/' + id)
      .then(res => {
        dispatch(deleteUser({ id }))
      }).catch(err => console.log(err))
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success btn-sm">
          Add +
        </Link>
        <button onClick={()=>handleDelete(users.id)} className="btn btn-success btn-sm">
          Download XLSX
        </button>
        <button onClick={ () => handleDelete(users.id)} className="btn btn-success btn-sm">
          Download CSV
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>License Number</th>
              <th>Age</th>
              <th>DOB</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => {
                return <tr>
                  <td>{user.name}</td>
                  <td>{user.licenseNumber}</td>
                  <td>{user.age}</td>
                  <td>{user.dob}</td>
                  <td>
                    <Link to={`/edit/${user.id}`} className="btn btn-sm btn-success me-2">Edit</Link>
                    <button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-danger">Del</button>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
