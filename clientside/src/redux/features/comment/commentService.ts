import axios from 'axios';



//create Comment
const createComment = async (id: any, postData: any) => {
    const response = await axios.post(`https://blogxiteapi.onrender.com/api/post/${id}`, postData)
    console.log(response.data);
    return response.data;
}




const commentService = {
    createComment
}
export default commentService;