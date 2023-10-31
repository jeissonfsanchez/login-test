import { createStore } from 'vuex';

/* Importaciones de los módulos */


/* De administration */
import { users } from '@/app/administration/modules/users';
import { web } from '@/app/public/modules/web';

/* De public */

const store = createStore({
  state: {
    // Aquí defines el estado de tu aplicación
  },
  mutations: {
    // Aquí defines las mutaciones para modificar el estado
  },
  actions: {
    // Aquí defines las acciones que pueden realizar cambios asíncronos y llamar a mutaciones
  },
  getters: {
    // Aquí defines los getters para obtener datos calculados a partir del estado
  },
  modules: {
    // Aquí puedes importar y añadir módulos adicionales si es necesario
    users,
    web,
  }
});

export default store;
