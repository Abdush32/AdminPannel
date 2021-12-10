import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { delPost, getPost } from "../../api/post";
import { toast } from "react-toastify";
import { Spinner } from "reactstrap";

class Allpost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cat_title: "",
      Allpostdata: [],
      loader: true,
      delmodal: false,
      deletId:null,
    };
  }
  deltoggle = (id) => {
    this.setState({
      delmodal: !this.state.delmodal,
      deletId:id
    });
  };
  componentDidMount = () => {
    getPost()
      .then((res) => {
        console.log(res);
        this.setState({
          Allpostdata: res.data.posts,
        });
        this.setState({ loader: false });
      })
      .catch((err) => console.log(err));
  };

  handleDelete = (id) => {
    delPost(id).then((res) => {
      console.log(res);

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
                            <th>Post_Id</th>
                            <th>post_thumbnail</th>
                            <th>post_title</th>
                            <th>Category</th>
                            <th>post_user</th>
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
                            this.state.Allpostdata.length > 0 &&
                            this.state.Allpostdata.map((ele, index) => (
                              <tr key={index}>
                                <td>{ele.post_id}</td>
                                <td>
                                  <img
                                    src={ele.post_thumbnail}
                                    className="img-fluid"
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      borderRadius: "5px",
                                    }}
                                  />
                                </td>
                                <td>{ele.post_title}</td>
                                <td>{ele.category.cat_title}</td>
                                <td>{ele.user.name}</td>
                                <td>
                                  <Link to={`/singlePost/${ele.post_id}`}>
                                    <i class="fas fa-pen"></i>
                                  </Link>
                                  &nbsp; &nbsp; &nbsp;
                                  <Link onClick={() => this.deltoggle(ele.post_id)}>
                                    <i
                                      class="fa fa-trash"
                                      style={{ color: "red" }}
                                    ></i>
                                  </Link>
                                
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div class="card"></div>
                  <div>
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
                                          onClick={() =>
                                            this.handleDelete(this.state.deletId)
                                          }
                                        >
                                          Yes
                                        </Button>{" "}
                                        <Button
                                          color="danger"
                                          onClick={this.deltoggle}
                                        >
                                          No
                                        </Button>
                                      </ModalFooter>
                                    </Modal>
                                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Allpost;
