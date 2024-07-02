import { combineReducers } from 'redux';
import bookmarksReducer from './bookmarksReducer';

const rootReducer = combineReducers({
  bookmarks: bookmarksReducer,
});

export default rootReducer;
