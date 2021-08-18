import { getMemos } from '../../service/memos-api';
import {
  MEMOS_LIST_FAIL,
  MEMOS_LIST_REQUEST,
  MEMOS_LIST_SUCCESS,
} from '../constants/memoConstants';

export const listMemos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMOS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await getMemos(userInfo.token);

    dispatch({
      type: MEMOS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MEMOS_LIST_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};
