import axios from 'axios';



//create Comment
const createComment = async (id: any, postData: any) => {
    const response = await axios.post(`http://localhost:5000/api/post/${id}`, postData)
    console.log(response.data);
    return response.data;
}




const commentService = {
    createComment
}
export default commentService;