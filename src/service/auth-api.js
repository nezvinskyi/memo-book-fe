import axios from 'axios';

import './api-settings';

const config = {
  headers: {
    'Content-type': 'application/json',
  },
};

const loginUser = async (email, password) => {
  const { data } = await axios.post('/api/v1/users/login', { email, password }, config);

  return data;
};

const registerUser = async (name, email, password, avatar) => {
  // in case no avatar provided, the gravatar will be used instead. See Schema avatar default.

  if (avatar) {
    return await axios.post('/api/v1/users', { name, email, password, avatar }, config);
  } else {
    return await axios.post('/api/v1/users', { name, email, password }, config);
  }
};

const api = { loginUser, registerUser };

export default api;
