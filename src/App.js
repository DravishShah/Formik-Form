import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import UserList from "./components/UserList";
import UserEdit from "./components/UserEdit";
import UserDelete from "./components/UserDelete";
import UserCreate from "./components/UserCreate";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/users">User List</Link>
            </li>
            <li>
              {/* Add a link for creating a new user */}
              <Link to="/users/create">Create User</Link>
            </li>
          </ul>
        </nav>
        <hr />
        <Switch>
          <Route path="/users" exact component={UserList} />
          <Route path="/users/edit/:id" component={UserEdit} />
          <Route path="/users/delete/:id" component={UserDelete} />
          {/* Add a route for the UserForm */}
          <Route path="/users/create" component={UserCreate} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
