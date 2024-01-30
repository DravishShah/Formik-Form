import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const UserDelete = () => {
  const { id } = useParams();
  const history = useHistory();
  const [user, setUser] = useState({});

  useEffect(() => {
    // Fetch user details when the component mounts
    axios
      .get(`http://localhost:5000/api/users/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user details:", error));
  }, [id]);

  const handleDelete = async () => {
    try {
      // Make a DELETE request to delete the user
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      console.log("User deleted successfully");
      // Optionally, update the user list or perform other actions
      history.push("/users"); // Redirect to user list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2>Delete User</h2>
      <p>
        Are you sure you want to delete {user.firstName} {user.lastName}?
      </p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default UserDelete;
