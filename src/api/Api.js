

const baseUrl = "https://blogmitiz.readandfeel.in/api/v1/auth/registers";
const baseUrl2 = "https://blogmitiz.readandfeel.in/api/v1/auth/login";


export const createuser = (user) => {
  return fetch(`${baseUrl}`, {
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
  return fetch(`${baseUrl2}`, {
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