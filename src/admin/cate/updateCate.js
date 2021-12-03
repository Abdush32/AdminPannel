import React, { Component } from "react";
import { singleCategory}  from "../../api/category";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

class updateCate extends Component {
    constructor(props) {
        super(props);
        this.state = {
        getSingleCate:[],
        };
      }


componentDidMount = () => {
    singleCategory(this.props.match.params.id).then((res) => {
        console.log(res);
        this.setState({
            getSingleCate: res.category.cat_title
        })

    })
}


  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <section class="content" style={{ marginLeft: "650px" }}>
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6 col-md-offset-4">
                <div class="card card-primary">
                  <div class="card-header">
                    <h3 class="card-title">updateCategory</h3>
                  </div>
                  <form>
                    <div class="card-body">
                      <div class="form-group">
                        <label for="enterCategory">Category</label>
                        <input
                          type="email"
                          class="form-control"
                          id="enterCategory"
                          placeholder="Enter email"
                          value={this.state.getSingleCate}
                        />
                      </div>
                    </div>
                    <div class="card-footer">
                      <button type="submit" class="btn btn-primary">
                        Submit
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

export default updateCate;
