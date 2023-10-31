import { defaults, get } from 'lodash'
import axios from 'axios';
import router from "@/router"

export const connection = (options = {}) => {
  const instance = axios.create();
  instance.interceptors.request.use(req => {
    req.headers.Authorization = "Bearer "+localStorage.getItem("api_token");
    /*req.params = {
      userId: localStorage.getItem("userId"),
      ...req.params,
    };*/
    return req
  })
  instance.interceptors.response.use(function (response) {
    const newtoken = get(response, 'headers.authorization')
    if (newtoken) {
      localStorage.setItem("api_token", newtoken.replace('Bearer','').trim()) 
    };
    return response
  }, function (error) {
      const newtoken = get(error.response.headers, 'headers.authorization');
      if (newtoken) {
        localStorage.setItem("api_token", newtoken.replace('Bearer','').trim()) 
        console.log('Error token updated');
      };
      switch (error.response.status) {
        case 401:
          alert('Sesión expirada, por favor autentíquese nuevamente');
          localStorage.clear()
          router.push({ path: '/login'})
          break;
        case 400:
          alert('Solicitud erronea, por favor autentíquese nuevamente');
          localStorage.clear()
          router.push({ path: '/login'})
          break;
        case 403:
          alert('Acceso no autorizado');
          router.push('/');
          break;
      }
    return Promise.reject(error)
  })

  return instance
}

export default connection();