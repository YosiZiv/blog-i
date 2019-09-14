import axios from 'axios';

const axiosConfig = () => {
  const adminToken = localStorage.getItem('adminToken');
  const userToken = localStorage.getItem('userToken');
  const authorization = adminToken ? adminToken : userToken ? userToken : null;
  // Helper functions
  const instance = axios.create({
    // baseURL:   'https://' + window.location.host + '/api',
    baseURL: 'http://localhost:5000/api',
    headers: { authorization }
  });
  return instance;
};
export default axiosConfig;
