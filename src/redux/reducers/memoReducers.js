import {
  MEMOS_LIST_FAIL,
  MEMOS_LIST_REQUEST,
  MEMOS_LIST_SUCCESS,
} from '../constants/memoConstants';

export const memoListReducer = (state = { memos: [] }, action) => {
  switch (action.type) {
    case MEMOS_LIST_REQUEST:
      return { loading: true };
    case MEMOS_LIST_SUCCESS:
      return { loading: false, memos: action.payload };
    case MEMOS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
