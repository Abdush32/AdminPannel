import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "reactstrap";
import { getCategory, delCategory, createCate } from "../../api/category";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import "./style/cate.css";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cat_title: "",
      categoryList: [],
      loader: true,
      modal: false,
      deletId:null,
      delmodal: false,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  deltoggle = (id) => {
    this.setState({
      delmodal: !this.state.delmodal,
      deletId:id,
    });
  };
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    createCate(this.state).then((res) => {
      console.log(res);
      this.setState({
        cat_title: "",
      });
      if (res.status) {
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  componentDidMount = () => {
    getCategory()
      .then((res) => {
        this.setState({
          categoryList: res.data.categories,
        });
        this.setState({ loader: false });
      })
      .catch((err) => console.log(err));
  };

  handleDelete = (id) => {
    // let Data = this.state.categoryList;
    delCategory(id).then((res) => {
      console.log(res);
      // this.setState({loader: false})
      if (res) {
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        this.setState({
          delmodal: false,
        });
        this.setState({ loader: false });
      } else {
        console.log("Not Able to Delete");
      }
    });
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
                  <button
                    type="button"
                    class="btn btn-success  float-right"
                    onClick={this.toggle}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section class="content">
            <div class="row">
              <div class="col-sm-8"></div>
              <div class="col-sm-4">
                <form class="">
                  {" "}
                  <div className="input-group input-group-sm" id="searchbox">
                    <input
                      className="form-control form-control-navbar  float-right"
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
                            <th>Totalpost</th>
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
                            this.state.categoryList.length > 0 &&
                            this.state.categoryList.map((ele, index) => (
                              <tr key={index}>
                                <td>{ele.id}</td>
                                <td>{ele.cat_title}</td>
                                <td>{ele.total_post}</td>
                                <td>
                                  <Link to={`/singleCate/${ele.id}`}>
                                    <i class="fas fa-pen"></i>
                                  </Link>
                                  &nbsp; &nbsp; &nbsp;
                                  <Link onClick={() => this.deltoggle(ele.id)}>
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
                  <Modal
                    isOpen={this.state.delmodal}
                    deltoggle={this.deltoggle}
                    className={this.props.className}
                  >
                    <ModalHeader deltoggle={this.deltoggle}>
                      Category
                    </ModalHeader>
                    <ModalBody>
                      <h6>Are you Sure to delete ...</h6>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="info"
                        type="submit"
                        onClick={() => this.handleDelete(this.state.deletId)}
                      >
                        Yes
                      </Button>{" "}
                      <Button color="danger" onClick={this.deltoggle}>
                        No
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <div class="card"></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Category</ModalHeader>
            <ModalBody>
              <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                  <label for="usr"></label>
                  <input
                    type="text"
                    class="form-control"
                    id="cat_title"
                    name="cat_title"
                    placeholder="Enter your  Category"
                    value={this.state.cat_title}
                    onChange={this.handleChange}
                    required="required"
                  />
                </div>
                <div class="text-center">
                  <Button type="submit" color="danger" onClick={this.toggle}>
                    Submit
                  </Button>
                </div>
              </form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Category;
