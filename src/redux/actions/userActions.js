import api from '../../service/auth-api';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTRATION_FAIL,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants';
// import { unsetToken } from '../../service/auth-api';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const data = await api.loginUser(email, password);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const logout = () => async dispatch => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  // unsetToken();
};

export const register = (name, email, password, avatar) => async dispatch => {
  try {
    dispatch({ type: USER_REGISTRATION_REQUEST });

    const data = await api.registerUser(name, email, password, avatar);

    dispatch({ type: USER_REGISTRATION_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTRATION_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const updateProfile = user => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const data = await api.updateUser(user, token);

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};
