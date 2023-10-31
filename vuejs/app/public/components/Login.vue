<template>
    <div class="c-app flex-row align-items-center">
      <c-container>
        <c-row class="justify-content-center">
          <c-col md="6">
            <c-card>
              <c-card-body p-4>
                <h1>Iniciar sesión</h1>
                <p class="text-muted">Ingresa tus credenciales</p>
                <c-form @submit.prevent="userLogin">
                  <c-row class="mb-3">
                    <c-col>
                      <c-input-group>
                        <c-input-group-text>
                            <font-awesome-icon :icon="['fas', 'envelope']" size="xl" />
                        </c-input-group-text>
                        <c-form-input type="email" v-model="email" id="email" placeholder="Nombre de usuario" required autofocus />
                      </c-input-group>
                    </c-col>
                  </c-row>
                  <c-row class="mb-3">
                    <c-col>
                      <c-input-group>
                        <c-input-group-text>
                            <font-awesome-icon :icon="['fas', 'lock']" size="xl" />
                        </c-input-group-text>
                        <c-form-input type="password" v-model="password" id="password" placeholder="Contraseña" required />
                      </c-input-group>
                    </c-col>
                  </c-row>
                  <c-row class="mb-3">
                    <c-col>
                        <div class="d-flex justify-content-between">
                            <c-button type="submit" shape="rounded-pill" color="primary" class="">Iniciar sesión</c-button>
                            <c-button shape="rounded-pill" color="link" @click="toRegister" class="text-underline">Registrarse</c-button>
                        </div>
                    </c-col>
                  </c-row>
                </c-form>
                <div v-if="error" class="error-message">
                  {{ error }}
                </div>
              </c-card-body>
            </c-card>
          </c-col>
        </c-row>
        <!--<CElementCover
                  v-show="loading"
                  :boundaries="[{ sides: ['top', 'left'], query: '.media-body' }]"
                  :opacity="0.8">-->
        <CSpinner v-show="loading" color="success" />
        <!--</CElementCover>-->
      </c-container>
    </div>
  </template>

  <script>
  import { createNamespacedHelpers } from 'vuex';

  const {
    mapState: mapStateWeb,
    mapActions: mapActionsWeb,
    mapGetters: mapGettersWeb,
    mapMutations: mapMutationsWeb
  } = createNamespacedHelpers('web');

  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        loading: false,
        error: '',
      };
    },
    methods: {
      ...mapActionsWeb(['login']),
      userLogin() {
        if (!this.validateEmail(this.email)) {
          this.error = 'Por favor, ingresa un email válido';
          return;
        }

        if (!this.email || !this.password) {
          this.error = 'Por favor, completa todos los campos';
          return;
        }

        this.login({
          email: this.email,
          password: this.password
        });
      },
      validateEmail(email) {
        // Expresión regular para validar el formato del correo electrónico
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Verificar si el correo electrónico coincide con el patrón
        return emailPattern.test(email);
      },
      toRegister() {
        this.$router.push({name: 'Register'});
      },
    },
    computed: {
      ...mapGettersWeb(['getLoginStatus']),
      ...mapStateWeb(['webData']),
    },
    watch: {
      getLoginStatus(status) {
        this.loading = status === 1;
        switch (status) {
          case 2:
            this.$toast.success('Sesión iniciada correctamente');
            localStorage.setItem('api_token', this.webData.access_token);
            this.$router.push({ name: 'Home'});
            break;
          case 3:
            this.$toast.error('Email y/o contraseña inválidos');
            break;
          default:
            break;
        }
      },
    },
  };
  </script>

  <style scoped>

  </style>
