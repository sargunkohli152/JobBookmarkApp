import { ADD_BOOKMARK, REMOVE_BOOKMARK } from '../actions/bookmarkActions';

const initialState = {
  bookmarks: [],
};

const bookmarksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOKMARK:
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload],
      };
    case REMOVE_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(item => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default bookmarksReducer;