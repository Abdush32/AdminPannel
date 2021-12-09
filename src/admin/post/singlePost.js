import React, { Component } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { singlePost_api } from "../../api/post";
import { getCategory } from "../../api/category";
class singlePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getSinglePost: [],
      loader: true,
      convertedText: "Some default content",
      setConvertedText: "",
      categoryList: [],
      post_thumbnail: null,
      post_id: "",
      post_title: "",
      hashtag: [],
      post_description: "",
      category_id: "",
      thumbnail_url: "",
    };
  }

  handleChange = (e) => {
    let value = e.target.value;
    console.log(value);
    this.setState({
      ...this.state,
      [e.target.name]: value,
    });
  };

componentDidMount = () => {
    getCategory()
    .then((res) => {
      console.log(res);
      this.setState({
        categoryList: res.data.categories,
      });
      console.log(this.state.categoryList);
    })
    .catch((err) => console.log(err));
    singlePost_api(this.props.match.params.id).then((res) => {
      console.log(res);
      this.setState({
        post_id: res.data.posts.post_id,
        post_title: res.data.posts.post_title,
        hashtags: res.data.posts.hashtags.hashtag,
        post_description: res.data.posts.post_description,
        category_id:res.data.posts.category.id,
        post_thumbnail: res.data.posts.post_thumbnail,
        loader: false,
      });
      console.log(this.state.category_id);
    });
  };

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
                  <form onSubmit={this.handleSubmit}>
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
                          <label for="usr">post_title</label>
                          <input
                            type="text"
                            class="form-control"
                            id="post_title"
                            name="post_title"
                            value={this.state.post_title}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div class="form-group">
                          <label for="hashtag">hashtag</label>
                          <input
                            type="text"
                            class="form-control"
                            id="hashtag"
                            name="hashtag"
                            value={this.state.hashtag}
                            onChange={this.handleChangeHashtag}
                          />
                        </div>

                        <div class="form-group">
                          <label for="category">Category</label>
                          <select
                            class="form-control"
                            id="category_id"
                            class="category_id"
                            name="category_id"
                            onChange={this.handleChange}
                            value={this.state.category_id}
                          >
                            <option>Choose category...</option>
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
                            name="post_description"
                            id="post_description"
                            modules={this.modules}
                            formats={this.formats}
                            value={this.state.post_description}
                            onChange={this.handleChangeone}
                            style={{ minHeight: "300px" }}
                          />
                        </div>
                        <div class="form-group">
                          <button type="submit" class="btn btn-primary">
                            update
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
                    src={this.state.post_thumbnail}
                    class="img-thumbnail img-responsive"
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

export default singlePost;
