import axios from "axios";

const List = (params) => axios.get("/diff/list", { params }).then(resp => resp.data)

const Contents = (params) => axios.get("/diff/contents", { params }).then(resp => resp.data)

export {
    List,
    Contents
}