import { addMemo, getMemos, updateMemo } from '../../service/memos-api';
import {
  MEMOS_ADD_FAIL,
  MEMOS_ADD_REQUEST,
  MEMOS_ADD_SUCCESS,
  MEMOS_LIST_FAIL,
  MEMOS_LIST_REQUEST,
  MEMOS_LIST_SUCCESS,
  MEMOS_UPDATE_REQUEST,
  MEMOS_UPDATE_SUCCESS,
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

export const addMemoAction = (title, content, category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMOS_ADD_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const data = await addMemo(title, content, category, userInfo.token);
    dispatch({
      type: MEMOS_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MEMOS_ADD_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const updateMemoAction = (id, title, content, category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMOS_UPDATE_REQUEST,
    });

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const data = await updateMemo({ id, title, content, category, token });

    dispatch({
      type: MEMOS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MEMOS_ADD_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};
