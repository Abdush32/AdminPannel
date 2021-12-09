const baseUrl = "https://blogmitiz.readandfeel.in/api/v1/post";
const localdata =  JSON.parse(localStorage.getItem("data"))
const token = localdata.token;
console.log(token);




export const createCate = (cate) => {
  console.log(cate);
  return fetch(`${baseUrl}/create_category`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cate),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const getCategory = () => {
  console.log();
  return fetch(`${baseUrl}/get_category`, {
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

export const singleCategory = (id) => {
  return fetch(`${baseUrl}/get_single_category/${id}`, {
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

export const updateCategory = (cate) => {
  return fetch(`${baseUrl}/update_category`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(cate),
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const delCategory = (id) => {
  return fetch(`${baseUrl}/delete_category/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => console.log(err));
};
