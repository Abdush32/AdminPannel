import React, { Component } from "react";
import { createData, deleteData, getSingledata } from "../../api/userlist1Api";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";


class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getoneDataonly: [],
      modal: true,
  
    };
  }

  componentDidMount = () => {
    // console.log(this.props);
    getSingledata(this.props.match.params.id).then((res) => {
      this.setState({
        getoneDataonly: res.data,
      });
      console.log({ getoneDataonly: res.data });
    });
  };

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value,
    });
  };
  handleGender = (e) => {
    const value = e.target.value;
    this.setState({
      ...(this.state.gender = value),
    });
  };

  handleStatus = (e) => {
    const value = e.target.value;
    this.setState({
      ...(this.state.status = value),
    });
  };
  handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    createData(this.state).then((res) => {
      console.log(res);
      this.setState({
        name: "",
        email: "",
        gender: "",
        status: "",
      });
      if (res && res.success) {
        console.log("working");
      } else {
        console.log("something wrong");
      }
    });
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  handleDelete = () => {
    deleteData(this.props.match.params.id).then((res) => {
      console.log(res);
      if (res) {
        this.props.history.push("/UserList1");
      } else {
        console.log("not able to delete the data");
      }
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <center>
          <h3>Single Data</h3>
        </center>
        <div
          className="row d-flex justify-content-center"
          style={{ marginLeft: "450px" }}
        >
          {this.state.modal ? (
            <div className="col-md-6 d-flex align-items-stretch">
              <div className="card p-2">
                <div className="card-body d-flex flex-column">
                  <p className="card-title">
                    Id:{this.state.getoneDataonly.id}
                  </p>
                  <p className="card-title">
                    Name:{this.state.getoneDataonly.name}
                  </p>
                  <p className="card-text">
                    Email:{this.state.getoneDataonly.email}
                  </p>
                  <p className="card-text">
                    Gender:{this.state.getoneDataonly.gender}
                  </p>
                  <p className="card-text">
                    Status:{this.state.getoneDataonly.status}
                  </p>
                  <button
                    className="btn btn-warning mb-1"
                    onClick={this.toggle}
                  >
                    Edithere
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={this.handleDelete}
                  >
                    Del
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card  d-flex" style={{ marginRight: "300px" }}>
              <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                  <label for="exampleInputEmail1">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    value={this.state.getoneDataonly.name}
                    onChange={this.handleChange}
                  />
                </div>

                <div class="form-group">
                  <label for="exampleInputEmail1">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter name"
                    value={this.state.getoneDataonly.email}
                    onChange={this.handleChange}
                  />
                </div>

                <div class="form-group">
                  <label for="exampleInputEmail1">Gender</label>
                  <select
                    class="form-select form-select-md"
                    aria-label=".form-select-sm example"
                    value={this.state.getoneDataonly.gender}
                    onChange={this.handleGender}
                  >
                    <option selected>Select gender</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="exampleInputEmail1">Status</label>
                  <select
                    class="form-select form-select-md"
                    aria-label=".form-select-sm example"
                    value={this.state.getoneDataonly.status}
                    onChange={this.handleStatus}
                  >
                    <option selected>Select status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <button  type="submit" class="btn btn-danger">update</button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ViewProfile;
