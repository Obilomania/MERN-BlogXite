import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";
import createPostInterface from "../../../interfaces/createPostInterface";
import toastNotify from "../../../Helpers/toastNotify";

const initialState: any = {
  post: null,
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};



//Create New Post
export const createNewPost: any = createAsyncThunk(
  "post/create",
  async (postData: createPostInterface, thunkAPI) => {
    try {
      return await postService.createPost(postData)
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message)
    }
  }
)


//Get All Post
export const getPosts: any = createAsyncThunk(
  "post/getAll",
  async (_, thunkAPI) => {
    try {
      return await postService.getAllPost()
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message)
    }
  }
)


//Delete A Post
export const deleteAPost: any = createAsyncThunk(
  "post/delete",
  async (id:any, thunkAPI) => {
    try {
      return await postService.deletePost(id)
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message)
    }
  }
)



//Delete A Post
export const getSinglePost: any = createAsyncThunk(
  "post/getPost",
  async (id: any, thunkAPI) => {
    try {
      return await postService.getPost(id)
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message)
    }
  }
)

/// Update Product
export const updateAPost = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }:any, thunkAPI) => {
    try {
      return await postService.updatePost(id, formData);
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
);





//POST SLICE
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    Set_Post: (state, action) => {
      state.post = action.payload;
    },
    Set_Search: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.posts.push(action.payload);
        toastNotify("Post Created Succefully", "success")
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toastNotify("Something went wrong, Pleasee try again.", "error")
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.posts = action.payload;

      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toastNotify("Something went wrong, Pleasee try again.", "error")
      })
      .addCase(deleteAPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toastNotify("Post deleted successfully", "success")
      })
      .addCase(deleteAPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toastNotify(action.payload, "error")
      })
      .addCase(getSinglePost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload;
      })
      .addCase(getSinglePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        return toastNotify(action.payload, "error")
      })
    .addCase(updateAPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload);
        toastNotify("post updated successfully", "success");
      })
      .addCase(updateAPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        return toastNotify(state.message, "error")
      });
  }
});

export const { Set_Post, Set_Search } = postSlice.actions;
export const selectIsloading = (state: any) => state.post.isLoading;
export const selectPost = (state: any) => state.post.post;
export const selectAllPosts = (state: any) => state.post.posts;
export const postReducer = postSlice.reducer;

// export default postSlice.reducer;
