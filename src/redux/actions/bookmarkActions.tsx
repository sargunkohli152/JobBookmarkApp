export const ADD_BOOKMARK = 'ADD_BOOKMARK';
export const REMOVE_BOOKMARK = 'REMOVE_BOOKMARK';

export const addBookmark = (item: object) => ({
  type: ADD_BOOKMARK,
  payload: item,
});

export const removeBookmark = (item: object) => ({
  type: REMOVE_BOOKMARK,
  payload: item,
});