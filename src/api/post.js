import axios from "axios";

const baseUrl = "https://blogmitiz.readandfeel.in/api/v1/post";
const token = "45|2KCb5dIbLI1hB1YnJ9VCEuuygH42O4cff7KC4u9t";



export const create_post = (formData) => {
  
  return axios  
    .post(`${baseUrl}/create_post`, formData,{
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