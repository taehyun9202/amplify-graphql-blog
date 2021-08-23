import {
  CLEAR_BLOGGER,
  GET_BLOGGER,
  GET_POSTS,
  LOADING_POSTS,
  PUT_BLOGGER,
} from "../types";

const initialState = {
  posts: [],
  profile: {},
  // categoryId: "",
  // category: [],
  loading: false,
};
export const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_POSTS:
      return {
        ...state,
        loading: true,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        loading: false,
      };
    case GET_BLOGGER:
    case CLEAR_BLOGGER:
      return {
        ...state,
        profile: action.payload.profile,
        // category: action.payload.category,
        // categoryId: action.payload.categoryId,
        loading: false,
      };
    case PUT_BLOGGER:
      return {
        ...state,
        category: action.payload.category,
        loading: false,
      };
    default:
      return state;
  }
};
