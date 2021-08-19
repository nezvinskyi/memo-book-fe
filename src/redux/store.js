import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';
import {
  memoAddReducer,
  memoDeleteReducer,
  memoListReducer,
  memoUpdateReducer,
} from './reducers/memoReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  memoList: memoListReducer,
  memoAdd: memoAddReducer,
  memoUpdate: memoUpdateReducer,
  memoDelete: memoDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  memoList: { memos: [] },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
