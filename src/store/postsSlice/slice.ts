import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostType } from "../../types/postType";

interface postsState {
  posts: PostType[];
}
const initialState: postsState = {
  posts: [],
};

const PostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<PostType>) {
      state.posts.push(action.payload);
    },
    setPosts(state, action: PayloadAction<PostType[]>) {
      state.posts = action.payload;
    },
    removePosts(state) {
      state.posts = [];
    },
    updatePost(state, action: PayloadAction<PostType>) {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
  },
});

export const { addPost, removePosts, setPosts, updatePost } =
  PostsSlice.actions;
export const postsReducer = PostsSlice.reducer;
