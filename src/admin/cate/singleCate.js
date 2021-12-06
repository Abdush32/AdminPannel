import React, { Component } from "react";
import { Spinner } from "reactstrap";
import { singleCategory, updateCategory } from "../../api/category";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

class singleCate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getSingleCate: [],
      loader: true,
      cat_title: "",
      cat_id: "",
    };
  }

  handChange = (e) => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value,
    });
  };

  componentDidMount = () => {
    singleCategory(this.props.match.params.id).then((res) => {
      console.log(res);
      this.setState({
        cat_title: res.category.cat_title,
        cat_id: res.category.id,
        loader: false,
      });
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    updateCategory(this.state).then((res) => {
      console.log(res);
      if (res) {
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        this.props.history.push("/Category");
      } else {
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("Cant Update Data..");
      }
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <section class="content mt-5" style={{ marginLeft: "650px" }}>
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6 col-md-offset-4">
                <div class="card card-primary">
                  <div class="card-header">
                    <h3 class="card-title">updateCategory</h3>
                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <div class="card-body">
                      <div class="form-group">
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
                          ((
                            <input
                              type="hidden"
                              class="form-control"
                              id="cat_id"
                              name="cat_id"
                              value={this.state.cat_id}
                              onChange={this.handChange}
                            />
                          ),
                          (
                            <input
                              type="text"
                              class="form-control"
                              id="cat_title"
                              name="cat_title"
                              placeholder="Enter cat_title"
                              value={this.state.cat_title}
                              onChange={this.handChange}
                            />
                          ))
                        )}
                      </div>
                    </div>
                    <div class="card-footer">
                      <button type="submit" class="btn btn-primary">
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default singleCate;
