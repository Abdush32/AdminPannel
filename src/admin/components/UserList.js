import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../api/userList";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      UserList: [],
      pageno: 1,
      endPage: null,
    };
  }

  componentDidMount = () => {
    if (!localStorage.getItem("data")) {
      this.props.history.push("/");
    }
    console.log(this.props);

    getUser()
      .then((res) => {
        console.log(res);
        this.setState({
          UserList: res.data,
          pageno: res.page,
        });
      })
      .catch((err) => console.log(err));
  };

  onLoad = () => {
    console.log("i m onload Boy");
    this.setState({ pageno: this.state.pageno + 1 });
  };

  componentDidUpdate = (prev, prevState) => {
    if (this.state.pageno !== prevState.pageno) {
      getUser(this.state.pageno).then((res) => {
        console.log(res);
        this.setState({
          UserList: [...this.state.UserList, ...res.data],
        });
      });
    }
  };

  handleViewProfile = () => {
    console.log("i am loadmore");
  };

  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <div className="content-wrapper">
          <div className="container">
            <div className="row pt-3 mb-2">
              <div className="col-md-9">
                {" "}
                <h1 className="text-left">List of Employees</h1>
              </div>
              <div className="col-md-3">
                <form class="">
                  {" "}
                  <div className="input-group input-group-sm">
                    <input
                      className="form-control form-control-navbar"
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
            <div className="row">


            </div>

            <div className="row">
              {this.state.UserList.length > 0 &&
                this.state.UserList.map((ele, index) => (
                  <div className="col-md-3" key={index}>
                    <div className="card">
                      <img
                        className="card-img-top img-responsive"
                        src={ele.avatar}
                        alt="Card image"
                        height="200px"
                        width="100%"
                      />
                      <div className="card-body d-flex flex-column">
                        <h4 className="card-title">Id:{ele.id}</h4>
                        <br />
                        <h4 className="card-title">
                          Name:{ele.first_name}
                          {ele.last_name}
                        </h4>
                        <p className="card-text">Email:{ele.email}</p>
                        <Link
                        
                          className="btn btn-danger"
                          onClick={this.handleViewProfile}
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <Link className="btn btn-success" onClick={() => this.onLoad()}>
              LoadMore
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default UserList;
