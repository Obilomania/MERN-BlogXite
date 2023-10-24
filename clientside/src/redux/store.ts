import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userAuthReducer } from "./features/auth/userAuthSlice";
import { postReducer } from "./features/post/postSlice";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import filterReducer from "./features/post/filterSlice"
import { commentReducer } from "./features/comment/commentSlice";



const persistConfig = {
    key: 'root',
    storage,
}

const reducer = combineReducers({
    auth: userAuthReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: {
        persistedReducer,
        post: postReducer,
        comment: commentReducer,
        filter: filterReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
          
});


export type RootState = ReturnType<typeof store.getState>;
export default store