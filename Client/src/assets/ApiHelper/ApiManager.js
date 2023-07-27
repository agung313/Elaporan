import axios from 'axios';

const ApiManager = axios.create({
    baseURL: 'http://10.0.2.2:8000/',
    responseType: 'json',
    withCredentials: true,
  });

export default ApiManager

