import React, { Component } from "react";
import "./registration.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createuser, signup } from "../api/Api";
import { Link } from "react-router-dom";
import axios from "axios";
import { Spinner } from "reactstrap";

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      imagepath: null,
      loader: false,
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      mobile: "",
      profile_pic_path: "",
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
    createuser(this.state).then((res) => {
      console.log(res);
      this.setState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        mobile: "",
      });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (res && res.error) {
        this.props.history.push("/Signup");
      } else {
        this.props.history.push("/Signin");
      }
    });
  };
  onFileChange = async (e) => {
    // Update the state
    e.preventDefault();
    await this.setState({ selectedFile: e.target.files[0] });
    const formData = new FormData();
    await formData.append("profile_pic", this.state.selectedFile);
    console.log(this.state.selectedFile);
    this.setState({ loader: true });
    await axios
      .post(
        "https://blogmitiz.readandfeel.in/api/v1/auth/upload_profile_pic",
        formData
      )
      .then((res) => {
        this.setState({ loader: false });
        this.setState({
          imagepath: res.data.image_full_path,
          profile_pic_path: res.data.image_path,
        });
        console.log(res);
      });
  };
  render() {
    if (localStorage.getItem("userdata")) {
      this.props.history.push("./UserList");
    }

    const { fields } = this.state;
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
                  <label> Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="User Name"
                    required="required"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </div>
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
                  <label>User Name</label>
                  <input
                    type="text"
                    class="form-control"
                    name="mobile"
                    id="mobile"
                    placeholder="Enter your mobile"
                    required="required"
                    value={this.state.mobile}
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
                <div class="form-group">
                  <label>Confirm_Password</label>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    name="password_confirmation"
                    id="password_confirmation"
                    required="required"
                    value={this.state.password_confirmation}
                    onChange={this.handleChange}
                  />
                </div>
                <div class="form-group">
                  <label>Confirm_Password</label>
                  <input
                    type="file"
                    class="form-control"
                    placeholder="Password"
                    name=" profile_pic_path"
                    id=" profile_pic_path"
                    required="required"
                    onChange={this.onFileChange}
                  />
                </div>
                <div>
                  {!this.state.imagepath ? (
                    this.state.loader && (
                      <Spinner
                        style={{ width: "1rem", height: "1rem" }}
                        children={false}
                      />
                    )
                  ) : (
                    <img
                      src={this.state.imagepath}
                      width="200px"
                      height="200px"
                      class="img-thumbnail"
                    />
                  )}
                </div>
                <button type="submit" class="btn btn-secondary">
                  Register
                </button>
                &nbsp;
                <Link to="./Signin">
                  <button type="submit" class="btn btn-secondary">
                    Login
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
