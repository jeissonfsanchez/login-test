/*
    Imports the API URL from the config.
*/
import { DOMAIN_CONFIG } from '@/app/config.js';
import axios from 'axios';


export default {
  /*
    POST auth/login
  */
  login: function (data) {
    return axios.post(DOMAIN_CONFIG.API_URL + 'auth/login', data)
  },
}
