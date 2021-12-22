import axios from "axios";
import React, { Component } from "react";
import { Spinner } from "reactstrap";
import Navbar from "../admin/Navbar";
import Sidebar from "../admin/Sidebar";
import { singleUser, updateSingleUser } from "../api/Api";

class SingleUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleUser: [],
      user_id:"",
      name: "",
      email: "",
      mobile: "",

      imagepath:null,
      profile_pic_path:null,
      loader: true,
    };
  }

  componentDidMount = () => {
    singleUser(this.props.match.params.id)
      .then((res) => {
        this.setState({
          name: res.data.user.user_name,
          email: res.data.user.user_email,
          mobile: res.data.user.user_mobile,
          imagepath: res.data.user.user_profile_pic,
          user_id: res.data.user.user_id,
          loader: false,
        });
        console.log(this.state.singleUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (e) => {
    let value = e.target.value;

    this.setState({
      ...this.state,
      [e.target.name]: value,
    });

    console.log(this.state.name);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    updateSingleUser(this.state).then((res) => {
      console.log(res);
      this.setState({});
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        if (res && res.error) {
          this.props.history.push("/Allusers");
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
    return (
      <div>
        <Navbar />
        <Sidebar />
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
          <section class="content" style={{ marginLeft: "350px" }}>
            {/* {this.state.singleUser.length > 0 &&
              this.state.singleUser.map((ele, index) => ( */}
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-6">
                  <div class="card card-primary">
                    <div class="card-header">Post Form</div>
                    <form onSubmit={this.handleSubmit}>
                      <div class="card-body">
                        <div class="form-group">
                          <label for="exampleInputFile">User_profile_pic</label>
                          <div class="input-group">
                            <div class="custom-file">
                              <input
                                type="file"
                                class="custom-file-input"
                                id="profile_pic_path"
                                name="profile_pic_path"
                                onChange={this.onFileChange}
                              />
                              <label
                                class="custom-file-label"
                                for="exampleInputFile"
                              >
                                Choose file
                              </label>
                            </div>
                            <div class="input-group-append">
                              <span class="input-group-text">Upload</span>
                            </div>
                          </div>
                          <div class="form-group">
                            <label for="usr">User_Name</label>
                            <input
                              type="text"
                              class="form-control"
                              id="name"
                              name="name"
                              value={this.state.name}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div class="form-group">
                            <label for="hashtag">User_Email</label>

                            <input
                              type="text"
                              class="form-control"
                              id="email"
                              name="email"
                              value={this.state.email}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div class="form-group">
                            <label for="hashtag">User_Mobile</label>

                            <input
                              type="text"
                              class="form-control"
                              id="mobile"
                              name="mobile"
                              value={this.state.mobile}
                              onChange={this.handleChange}
                            />
                          </div>

                          <div class="form-group">
                            <button type="submit" class="btn btn-primary">
                              update
                              {this.state.loader ? (
                                <Spinner
                                  style={{
                                    width: "1rem",
                                    height: "1rem",
                                    marginTop: "25px",
                                  }}
                                  children={false}
                                />
                              ) : (
                                ""
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="col-md-6">
                  <div
                    class="card card-success"
                    style={{ height: "250px", width: "100%" }}
                  >
                    <div class="card-header">Preview</div>
                    <img
                      src={this.state.imagepath}
                      class="img-thumbnail img-responsive"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* ))} */}
          </section>
        )}
      </div>
    );
  }
}

export default SingleUser;
