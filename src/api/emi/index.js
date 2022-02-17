import axios from "axios";

const List = (params) => axios.get("/emi/list", { params }).then(resp => resp.data)

export {
    List
}