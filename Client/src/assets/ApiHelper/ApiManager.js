import axios from 'axios';

const ApiManager = axios.create({
    // baseURL: 'http://10.0.2.2:8000/',
    baseURL: 'https://eduk-bappeda.pekanbaru.go.id/elaporan/',
    responseType: 'json',
    withCredentials: true,
  });

export default ApiManager

