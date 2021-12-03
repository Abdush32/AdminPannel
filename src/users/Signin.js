import React, { Component } from "react";
import "./registration.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../api/Api";

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      // loader: true,
    };
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    login(this.state).then((res) => {
      if (res.data && res.status) {
        let userdata = {
          user_id: res.data.user_id,
          email: res.data.email,
          mobile: res.data.mobile,
          name: res.data.name,
          profile_pic: res.data.profile_pic,
          token: res.data.token,
        };

        localStorage.setItem("data", JSON.stringify(userdata));

        this.props.history.push("/userList");
      } else {
        console.log("NOT");
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  render() {
    let local_storagedata = localStorage.getItem("data");
    if (local_storagedata) {
      this.props.history.push("/userList");
    }

    return (
      <div>
        <div class="sidenav">
          <div class="login-main-text">
            <h2>
              Application
              <br /> Login Page
            </h2>
            <p>Login or register from here to access.</p>
          </div>
        </div>
        <div class="main">
          <div class="col-md-6 col-sm-12">
            <div class="login-form">
              <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Enter Email"
                    name="email"
                    id="email"
                    required="required"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    name="password"
                    id="password"
                    required="required"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
                <button type="submit" class="btn btn-secondary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
