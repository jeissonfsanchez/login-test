import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './assets/scss/global.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import ToastPlugin from 'vue-toast-notification';

import 'vue-toast-notification/dist/theme-bootstrap.css';

import CoreUI from '@coreui/vue';

library.add(far, fas, fab);

const app = createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(store)
.use(router)
.use(CoreUI)
.use(ToastPlugin,{
    position: 'top-right',
    duration: 3000,
    dismissible: true
})
.mount('#app');
