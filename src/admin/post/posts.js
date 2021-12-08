import React, { Component } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getCategory } from "../../api/category";
import { create_post } from "../../api/post";
import axios from "axios";
import { toast } from "react-toastify";
class posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      convertedText: "Some default content",
      setConvertedText: "",
      categoryList: [],
      post_thumbnail: null,
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

  handleChangeHashtag = (e) => {
    let value = e.target.value;
    console.log(value);
    var hashtagArray = value.split(" ");
    this.setState({
      ...this.state,
      [e.target.name]: hashtagArray,
    });
  };

  onFileChange = async (e) => {
    e.preventDefault();
    await this.setState({
      post_thumbnail: e.target.files[0],
      thumbnail_url: URL.createObjectURL(e.target.files[0]),
    });
  };

  handleChangeone = (post_description) => {
    console.log("onChange");
    this.setState({ post_description });
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

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state);
    const formData = new FormData();
    await formData.append("post_thumbnail", this.state.post_thumbnail);
    await formData.append("post_title", this.state.post_title);
    await formData.append("post_description", this.state.post_description);
    await formData.append("category_id", this.state.category_id);
    console.log(this.state.post_thumbnail);

    // let config = {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer 45|2KCb5dIbLI1hB1YnJ9VCEuuygH42O4cff7KC4u9t`,
    //   },
    // };
    // await axios
    //   .post(
    //     "https://blogmitiz.readandfeel.in/api/v1/post/create_post",
    //     formData,
    //     config
    //   )
    
    //   .then((res) => {
    //   if (res) {
    //     toast.success(res.message, {
    //       position: toast.POSITION.TOP_RIGHT,
    //     });
    //     console.log('successfulli');
    //   }else{
    //     console.log('not Successfuli');
    //   }
   
    //   });
    // create_post(this.state).then((res)=>{
    //   console.log(res);
    // })
    create_post(formData).then((res)=>{
      console.log(res);
    })
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
                            Submit
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
                    src={this.state.thumbnail_url}
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

export default posts;
