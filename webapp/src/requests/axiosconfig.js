import axios from 'axios';

export const instanceAxiosAPI = axios.create({
  baseURL: `/gateway/`,
  headers: {
    "Content-Type": "application/json", Accept: "application/json",
  },
});

const promise = (url, data = {}) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 300);
  })
);

export const instanceAPI = {
  get: promise,
  post: promise,
  patch: promise,
  delete: promise,
};

export default instanceAPI;
