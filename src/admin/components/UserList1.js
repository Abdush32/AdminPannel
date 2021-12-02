import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { createData } from "../../api/userlist1Api";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

class UserList1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allList: [],
      name: "",
      email: "",
      gender: "",
      status: "",
      pageno: 1,
    };
  }

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
    e.preventDefault();
    createData(this.state).then((res) => {
      console.log(res);
      this.setState({
        name: "",
      email: "",
      gender: "",
      status: "",
      })
      if(res && res.success){
        console.log("working");
      }else{
        console.log('something wrong');
      }
    });
  };

  loadMore = () => {
    console.log("loder pages");
    this.setState({ pageno: this.state.pageno + 1 });
  };

  // componentDidUpdate(prev, prevState) {
  //   if (this.state.pageno !== prevState.pageno) {
  //     axios
  //       .get("https://gorest.co.in/public/v1/users")
  //       .then(this.state.pageno)
  //       .then((res) => {
  //         console.log(res);
  //         this.setState({
  //           allList: [...this.state.allList, ...res.data],
  //         });
  //       });
  //   }
  // }

  componentDidMount() {
    axios.get("https://gorest.co.in/public/v1/users").then((res) => {
      console.log(res);
      this.setState({
        allList: res.data,
        pageno:res.page
      });
      console.log({ allList: res.data });
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <div className="content-wrapper">
          <div className="container">
            <div className="row pt-3 mb-2">
              <div className="col-md-9">
                {" "}
                <h1 className="text-left">List of Employees</h1>
              </div>
              <div className="col-md-3">
                <form class="">
                  {" "}
                  <div className="input-group input-group-sm">
                    <input
                      className="form-control form-control-navbar"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-navbar" type="submit">
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Link to="/UserList1">
                  <button
                    type="button"
                    className="btn btn-success float-right mb-2"
                    data-toggle="modal"
                    data-target="#myModal"
                  >
                    Add New
                  </button>
                </Link>
              </div>
            </div>

            <div className="row">
              {this.state.allList.data &&
                this.state.allList.data.length > 0 &&
                this.state.allList.data.map((ele, index) => (
                  <div
                    className="col-md-3 d-flex align-items-stretch"
                    key={index}
                  >
                    <div className="card" style={{ width: "100%" }}>
                      <div className="card-body d-flex flex-column">
                        <p className="card-title">Id:{ele.id}</p>
                        <p className="card-title">Name:{ele.name}</p>
                        <p className="card-text">Email:{ele.email}</p>
                        <p className="card-text">Gender:{ele.gender}</p>
                        <p className="card-text">Status:{ele.status}</p>
                        <Link
                        to={`/Viewprofile/${ele.id}`}
                          className="btn btn-danger align-self-center"
                          onClick={this.handleViewProfile}
                          style={{ marginTop: "auto" }}
                        >
                          View Profile
                        </Link>
                        {/* <br/>
                        <Link to={`/UpdateData/${ele.id}`}
                          className="btn btn-danger align-self-center"
                          onClick={this.handleViewProfile}>Edit</Link> */}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <Link onClick={this.loadMore}>
          <button className="btn btn-warning">loadmore</button>
        </Link>
        <div class="modal" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Add User</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div class="modal-body">
                <div class="container">
                  <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                      <label for="name">Name:</label>
                      <input
                        type="name"
                        class="form-control"
                        id="name"
                        placeholder="Enter Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div class="form-group">
                      <label for="email">Email:</label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="Enter email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div class="form-group">
                      <label for="gender"> Gender:</label>
                      <select
                        class="form-select form-select-md"
                        aria-label=".form-select-sm example"
                        value={this.state.gender}
                        onChange={this.handleGender}
                      >
                        <option selected>Select gender</option>
                        <option value="male">male</option>
                        <option value="female">female</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="status"> Status:</label>
                      <select
                        class="form-select form-select-md"
                        aria-label=".form-select-sm example"
                        value={this.state.Status}
                        onChange={this.handleStatus}
                      >
                        <option selected>Select status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                    <button type="submit" class="btn btn-dark">
                      Submit
                    </button>
                  </form>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserList1;
