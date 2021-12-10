const baseUrl = "https://blogmitiz.readandfeel.in/api/v1/auth";
const users = "https://blogmitiz.readandfeel.in/api/v1/user/get_users";
const localdata =  JSON.parse(localStorage.getItem("data"))
const token = localdata.token;
console.log(token);
// get_users
export const createuser = (user) => {
  return fetch(`${baseUrl}/registers`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json(user);
    })
    .catch((err) => console.log(err));
};

export const login = (user) => {
  return fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json(user);
    })
    .catch((err) => console.log(err));
};

export const getAllusers = () => {
  console.log();
  return fetch(`${users}`, {
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