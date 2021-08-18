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
