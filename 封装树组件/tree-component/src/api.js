import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3335';
export const getTressList = () => {
    return axios.get('/getTreeList');
}