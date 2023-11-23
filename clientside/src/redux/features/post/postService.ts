import axios from "axios";
import createPostInterface from "../../../interfaces/createPostInterface";


//Create New Post
const createPost = async (postData : createPostInterface) => {
    const response = await axios.post("https://blogxiteapi.onrender.com/api/post", postData)
    return response.data;
}

//Get All Post
const getAllPost = async () => {
    const response = await axios.get("https://blogxiteapi.onrender.com/api/post")
    return response.data;
}


//Delete A Post
const deletePost = async (id:any) => {
    const response = await axios.delete(`https://blogxiteapi.onrender.com/api/post/${id}`)
    return response.data;
}


//Get A Post
const getPost = async (id: any) => {
    const response = await axios.get(`https://blogxiteapi.onrender.com/api/post/${id}`)
    return response.data;
}


//Update A Post
const updatePost = async (id: any, postData: createPostInterface) => {
    const response = await axios.patch(`http://localhost:5000/api/post/${id}`, postData)
    return response.data;
}


const postService = {
    createPost,
    getAllPost,
    deletePost,
    getPost,
    updatePost
}
export default postService;