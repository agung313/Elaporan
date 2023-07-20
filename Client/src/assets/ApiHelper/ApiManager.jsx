import axios from 'axios';

const ApiManager = axios.create({
    baseURL: '127.0.0.1:8000',
    responseType: 'json',
    withCredentials: true,
  });

export default ApiManager

