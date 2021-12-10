import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import Navbar from "../admin/Navbar";
import Sidebar from "../admin/Sidebar";
import { getAllusers } from "../api/Api";
class AllUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cat_title: "",
      allUsers: [],
      loader: true,
      delmodal: false,
    };
  }
  componentDidMount = () => {
    getAllusers().then((res) => {
      console.log(res);
      this.setState({
        allUsers: res.data.users,
      });
      this.setState({ loader: false });
      console.log(this.state.allUsers);
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <div class="content-wrapper">
          <section class="content">
            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <div class="card">
                    <div class="card-header">
                      <h3 class="card-title">
                        DataTable with minimal features & hover style
                      </h3>
                    </div>
                    <div class="card-body">
                      <table
                        id="example2"
                        class="table table-bordered table-hover"
                      >
                        <thead>
                          <tr>
                            <th>User_Id</th>
                            <th>User_Name</th>
                            <th>User_Email</th>
                            <th>User_Mobile</th>
                            <th>User_profile_pic</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.loader ? (
                            <Spinner
                              style={{
                                width: "2rem",
                                height: "2rem",
                              }}
                              children={false}
                              class="spinner1"
                            />
                          ) : (
                            this.state.allUsers.length > 0 &&
                            this.state.allUsers.map((ele, index) => (
                              <tr key={index}>
                                <td>{ele.user_id}</td>
                                <td>{ele.user_name}</td>
                                <td>{ele.user_email}</td>
                                <td>{ele.user_mobile}</td>
                                <td>
                                  <img
                                    src={ele.user_profile_pic}
                                    className="img-fluid"
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      borderRadius: "5px",
                                    }}
                                  />
                                </td>
                                <td>
                                  <Link to={`/singlePost/${"ele.post_id"}`}>
                                    <i class="fas fa-pen"></i>
                                  </Link>
                                  &nbsp; &nbsp; &nbsp;
                                  <Link onClick={this.deltoggle}>
                                    <i
                                      class="fa fa-trash"
                                      style={{ color: "red" }}
                                    ></i>
                                  </Link>
                                  <div></div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div class="card"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default AllUsers;
