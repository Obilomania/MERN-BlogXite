import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredPost: []
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        FILTER_POSTS: (state, action) => {
            const { posts, search } = action.payload
            const tempPost = posts.filter((post: any) => post.title.toLowerCase().includes(search.toLowerCase()) || post.category.toLowerCase().includes(search.toLowerCase()))


            state.filteredPost = tempPost
        },
    }
});

export const { FILTER_POSTS } = filterSlice.actions
export const selectFilteredPost = (state: any) => state.filter.filteredPost

export default filterSlice.reducer