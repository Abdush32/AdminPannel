import React, { Component } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getCategory } from "../../api/category";

class posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      convertedText: "Some default content",
      setConvertedText: "",
      categoryList: [],
      post_thumbnail: "",
      post_title: "",
      post_description: "",
      category_id: "",
    };
  }

  handleChange = (e) => {
    console.log(e);
    let value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value,
    });
  };

  handleChange = (setConvertedText) => {
    console.log("onChange", setConvertedText);
  };
  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  componentDidMount = () => {
    console.log("ehllo");
    getCategory()
      .then((res) => {
        console.log(res);
        this.setState({
          categoryList: res.data.categories,
        });
        console.log(this.state.categoryList);
      })
      .catch((err) => console.log(err));
  };

  handleChangecategory = (e) => {};

  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <section class="content" style={{ marginLeft: "350px" }}>
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6">
                <div class="card card-primary">
                  <div class="card-header">Post Form</div>
                  <form>
                    <div class="card-body">
                      <div class="form-group">
                        <label for="exampleInputFile">upload thumbnail</label>
                        <div class="input-group">
                          <div class="custom-file">
                            <input
                              type="file"
                              class="custom-file-input"
                              id="post_thumbnail"
                              name="post_thumbnail"
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
                          <label for="title">Enter Title</label>
                          <input
                            type="text"
                            class="form-control"
                            id="title"
                            placeholder="Enter title"
                          />
                        </div>

                        <div class="form-group">
                          <label for="category">Category</label>
                          <select
                            class="custom-select mb-3"
                            id="post_title"
                            class="post_title"
                          >
                            <option selected>Choose category...</option>
                            {this.state.categoryList.length > 0 &&
                              this.state.categoryList.map((ele, index) => (
                                <option value={ele.id} key={index + 1}>
                                  {ele.cat_title}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div class="form-group">
                          <ReactQuill
                            theme="snow"
                            modules={this.modules}
                            formats={this.formats}
                            value={this.state.convertedText}
                            onChange={this.handleChange}
                            style={{ minHeight: "300px" }}
                          />
                        </div>
                        <div class="form-group">
                          <button type="submit" class="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card card-success">
                  <div class="card-header">Preview</div>
                  <img
                    src="https://images.pexels.com/photos/10346632/pexels-photo-10346632.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    class="img-thumbnail img-responsive"
                    style={{ height: "250px", width: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default posts;
