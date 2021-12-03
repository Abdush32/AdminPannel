import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCategory } from "../../api/category";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
    };
  }

  componentDidMount = () => {
    getCategory()
      .then((res) => {
        console.log(res);
        this.setState({
          categoryList: res.data.categories,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <div class="content-wrapper">
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Categories</h1>
                </div>
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li class="breadcrumb-item active">Categories</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
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
                            <th>Id</th>
                            <th>Title</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.categoryList.length > 0 &&
                            this.state.categoryList.map((ele, index) => (
                              <tr key={index}>
                                <td>{ele.id}</td>
                                <td>{ele.cat_title}</td>
                                <td>
                                  <Link to={`/updatecate/${ele.id}`}>
                                    <i class="fas fa-pen"></i>
                                  </Link>
                                  &nbsp; &nbsp; &nbsp;
                                  <Link to="">
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </td>
                              </tr>
                            ))}
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

        <footer class="main-footer">
          <div class="float-right d-none d-sm-block">
            <b>Version</b> 3.1.0
          </div>
          <strong>
            Copyright &copy; 2014-2021{" "}
            <a href="https://adminlte.io">AdminLTE.io</a>.
          </strong>{" "}
          All rights reserved.
        </footer>
      </div>
    );
  }
}

export default Category;
