import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Registration from "./users/Registration";
import signin from "./users/Signin";
import UserList from "./admin/components/UserList";
import AddUser from "./admin/components/AddUser";
import UserList1 from "./admin/components/UserList1";
import ViewProfile from "./admin/components/ViewProfile";
import UpdateData from "./admin/components/UpdateData";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer />
        <Switch>
        <Route path="/" exact component={Registration} />
        <Route path="/signin" exact component={signin} />
        <Route path="/userList" exact component={UserList} />
       <Route path="/UserList1" exact component={UserList1} />
       <Route path="/viewProfile/:id" exact component={ViewProfile} />
       <Route path="/UpdateData/:id" exact component={UpdateData} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
