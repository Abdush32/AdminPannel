const baseUrl = "https://blogmitiz.readandfeel.in/api/v1/post";
const token = "45|2KCb5dIbLI1hB1YnJ9VCEuuygH42O4cff7KC4u9t";


export const create_post = (posts) => {
  console.log(posts);
  return fetch(`${baseUrl}/create_post`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(posts),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};