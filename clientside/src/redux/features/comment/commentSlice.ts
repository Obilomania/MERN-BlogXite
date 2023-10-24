import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import commentService from './commentService';
import toastNotify from '../../../Helpers/toastNotify';


const initialState: any = {
    comments: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}



//Create New comment
export const createNewComment: any = createAsyncThunk(
    "post/createComment",
    async ({ id, formData }: any, thunkAPI) => {
        try {
            return await commentService.createComment(id, formData);
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)





const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        Set_Comment: (state, action) => {
            state.comment = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNewComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.comments.push(action.payload);
                // console.log(action.payload);
            })
            .addCase(createNewComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                return toastNotify(action.payload, "error")
            });
    }
});

export const { Set_Comment } = commentSlice.actions
export const selectCommentIsloading = (state: any) => state.comment.isLoading;
export const selectComment = (state: any) => state.comment.comments;
export const commentReducer =  commentSlice.reducer