import axios from "axios";
// Edit this for the api
axios.defaults.baseURL = "https://gym-manager-app-api.onrender.com";

export async function getAllMembers() {
  return await axios.get("/members").then((res) => res.data);
}

export async function getMember(id) {
  return await axios.get("/members/get/member/" + id).then((res) => res.data);
}
export async function addMember(data) {
  return await axios.post("/members/add", data);
}

export async function deleteMember(id) {
  return await axios.delete("/members/delete/member/" + id).then((res) => res);
}

export async function updateMember(id, data) {
  return await axios
    .put("/members/update/member/" + id, data)
    .then((res) => res);
}
