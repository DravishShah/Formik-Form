import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserForm from "./TestSignUp"; // Change the import path
import axios from "axios";

const UserEdit = ({ history }) => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    // Fetch user details when the component mounts
    axios
      .get(`http://localhost:5000/api/users/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user details:", error));
  }, [id]);

  // Wait until user data is fetched before rendering the UserForm
  if (!user || Object.keys(user).length === 0) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (values) => {
    try {
      // Make a PUT request to update the user
      const response = await axios.put(
        `http://localhost:5000/api/users/${id}`,
        values
      );
      console.log("User updated:", response.data);
      // Optionally, update the user list or perform other actions
      history.push("/users"); // Redirect to user list after update
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <UserForm initialValues={user} onSubmit={handleSubmit} />
    </div>
  );
};

export default UserEdit;
