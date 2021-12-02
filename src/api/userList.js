const ListApi = "https://reqres.in/api/users";
const getOne = "https://reqres.in/api/users";

export const getUser = (pageno) => {
  console.log();
  return fetch(`${ListApi}?page=${pageno} `, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const getOnedata = ({id}) => {
  return fetch(`${getOne}/${id}`,{
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
