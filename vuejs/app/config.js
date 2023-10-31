/*
    Defines the API route we are using.
*/
import {devServer} from "@/../vue.config";

let environment = process.env.NODE_ENV;
let domain_production = "libreria.com";//validar con el cliente el dominio
let domain_development = devServer.host;
var api_url = '';
var cors_url = '';
var base_url = '';
var domain = '';
var stripe_key = '';
var stripe_redirect = '';

/* excepciones ambiente de prueba */
if (environment === 'production') {
  let hostname = window.location.hostname;
  switch (domain_development) {
    case 'libreria.test':
      environment = 'development';
      domain_development = hostname;
      break;
  }
}

switch( environment ){
  case 'development':
    domain = domain_development
    stripe_key = ''
    break;
  case 'production':
    domain = domain_production
    stripe_key = ''
    break;
}

stripe_redirect = 'https://'+domain+'/#/marketplace/cart'
api_url = '//'+domain+'/api/';
cors_url = '//'+domain+'/cors/';
base_url = '//'+domain+'/';


export const DOMAIN_CONFIG = {
  API_URL: api_url,
  CORS_URL: cors_url,
  BASE_URL: base_url,
  STRIPE_PK: stripe_key,
  STRIPE_URL_REDIRECT: stripe_redirect,
}
