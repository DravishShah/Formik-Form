import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users when the component mounts
    axios
      .get("http://localhost:5000/api/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.firstName} {user.lastName}
            <Link to={`/users/edit/${user._id}`}>Edit</Link>
            <Link to={`/users/delete/${user._id}`}>Delete</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
