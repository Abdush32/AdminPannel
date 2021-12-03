const listCategory = "https://blogmitiz.readandfeel.in/api/v1/post/get_category";
const token = "45|2KCb5dIbLI1hB1YnJ9VCEuuygH42O4cff7KC4u9t";
const singleCategories = "https://blogmitiz.readandfeel.in/api/v1/post/get_single_category"
export const getCategory = () => {
  console.log();
  return fetch(`${listCategory} `, {
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


export const singleCategory = (id) =>{
  return fetch(`${singleCategories}/${id}`,{
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type":"application/json",
      Authorization: `Bearer ${token}`,
    }
  }).then((res) =>{
    return res.json();
  }).catch((err) => console.log(err))
 }