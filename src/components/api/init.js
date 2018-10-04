import axios from 'axios';

// Set the baseURL regardless of jwt state
const axiosConfig = {
  baseURL: 'https://api.staging.conctr.com/'
};

// attempt to find the token in localStorage
const token = localStorage.getItem('jwt');

// import the token into headers if it exists
if (token) {
  axiosConfig.headers = {
    'Authorization': `jwt:${token}`
  };
};

const instance = axios.create(axiosConfig);

export default instance;