import { Button } from "bootstrap";
import React, { Component } from "react";
import { Form, FormGroup, Label } from "reactstrap";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      loader: true,
    };
  }
  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <div className="content-wrapper">
          <div className="container-fluid">
            <form class="form-inline">
            
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-navbar"
                  type="text"
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
            <div className="row">
              <div className="col-md-3">
                <div className="card">
                  <img
                    className="card-img-top img-responsive"
                    src="#"
                    alt="Card image"
                    height="200px"
                    width="100%"
                  />
                  <div className="card-body d-flex flex-column">
                    <h4 className="card-title">Id</h4>
                    <br />
                    <h4 className="card-title">Name:</h4>
                    <p className="card-text">Email:</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddUser;
