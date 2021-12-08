import axios from "axios";

const PostApi = "https://gorest.co.in/public/v1/users";
const token =
  "cf67ac6dd77e6c78f7c217142c24aa96feb7cc9296c1e37fb2893f120cc2e251";
const getOnedata = "https://gorest.co.in/public/v1/users";

export const createData = (user) => {
  return fetch(`${PostApi}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const getSingledata = (id) => {
  return fetch(`${getOnedata}/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const deleteData = (id) => {
  return axios
    .delete(`${getOnedata}/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log("res",res);
      return res;
    });
};
