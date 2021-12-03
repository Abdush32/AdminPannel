import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Registration from "./users/Registration";
import signin from "./users/Signin";
import UserList from "./admin/components/UserList";
import UserList1 from "./admin/components/UserList1";
import ViewProfile from "./admin/components/ViewProfile";
import UpdateData from "./admin/components/UpdateData";
import { ToastContainer } from "react-toastify";
import Category from "./admin/cate/Category"
import updateCate from "./admin/cate/updateCate"

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
      <Route path="/Category" exact component={Category}/>
      <Route path="/updateCate/:id" exact component={updateCate}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
