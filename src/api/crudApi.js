const createApi = "https://reqres.in/api/users";
const updateApi =  "https://reqres.in/api/users"



export const create = (users) =>{
    console.log(users);
 return    fetch(`${createApi}`,{
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(users),

 })
 .then((res) => {
    return res.json();
  })
  .catch((err) => console.log(err));
}

export const update = (id) =>{
 return fetch(`${updateApi}/${id}`,{
   method: "PUT",
   headers: {
     Accept: "application/json",
     "Content-Type":"application/json"
   }
 }).then((res) =>{
   return res.json();
 }).catch((err) => console.log(err))
}