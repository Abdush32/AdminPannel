import axios from "axios";

const baseUrl = "https://blogmitiz.readandfeel.in/api/v1/post";
const token = "4|wkPWTH32vbWiYxxYCUJ7NbLgRADb5o3g43OkzF5N";

export const create_post = (formData) => {
  return axios
    .post(`${baseUrl}/create_post`, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log("res", res);
      return res;
    });
};



export const getPost = () => {
  console.log();
  return fetch(`${baseUrl}/get_post`, {
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

export const singlePost_api = (id) => {
  return fetch(`${baseUrl}/get_single_post/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};