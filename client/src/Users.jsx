import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "./redux/userSlice";
import '@fortawesome/fontawesome-free';

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
      <div className="w-50 bg-white rounded p-4">
        <Link to="/create" className="btn btn-success btn-sm me-2">
          Add +
        </Link>
        <a href="/download/csv" className="btn btn-primary btn-sm me-2">Download
          CSV</a>
        <a href="/download/excel" className="btn btn-primary btn-sm me-2">Download
          Excel</a>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>License Number</th>
              <th>Age</th>
              <th>DOB</th>
              <th>Action</th>
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
                    <Link to={`/edit/:id`} className="btn btn-sm btn-success me-2">Edit</Link>
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
