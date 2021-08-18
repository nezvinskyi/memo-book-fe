import axios from 'axios';

import './api-settings';

export const getMemos = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get('/api/v1/memos', config);

  return data;
};

export const addMemo = async (title, content, category, token) => {
  const config = {
    'Content-Type': 'application/json',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post('/api/v1/memos/add', { title, content, category }, config);

  return data;
};
