import VueJwtDecode from 'vue-jwt-decode';

export function isAuthenticated(){
  const token = localStorage.getItem('api_token');
  if (token) {
    const decodedToken = VueJwtDecode.decode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp > currentTime) {
        return true;
    }
    // El token ha expirado, realizar acciones como cerrar sesión

    // return false;
  }
  // No hay token
  return false;
}
