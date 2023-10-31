<template>
    <div class="c-app flex-row align-items-center">
      <c-container class="container">
        <c-card>
          <c-card-body p-4>
            <c-card-title class="mb-4">Registro</c-card-title>
            <c-form @submit.prevent="registerUser">
                <c-row class="mb-3">
                    <c-col>
                        <c-input-group>
                            <c-input-group-text>
                                <font-awesome-icon :icon="['fas', 'user']" size="xl"/>
                            </c-input-group-text>
                            <c-form-input type="text" v-model="name" id="name" placeholder="Nombre" required autofocus/>
                        </c-input-group>
                    </c-col>
                </c-row>
                <c-row class="mb-3">
                    <c-col>
                        <c-input-group>
                            <c-input-group-text>
                                <font-awesome-icon :icon="['fas', 'location-dot']" size="xl"/>
                            </c-input-group-text>
                            <c-form-input type="password" v-model="email" id="email" placeholder="Email" required/>
                            <!--<c-form-input type="text" v-model="email" id="email" :placeholder="'En que dirección vive '+name+'?'" required/>-->
                        </c-input-group>
                    </c-col>
                </c-row>
                <c-row class="mb-3">
                    <c-col>
                    <c-input-group>
                            <c-input-group-text>
                                <font-awesome-icon :icon="['fas', 'lock']" size="xl" />
                            </c-input-group-text>
                            <c-form-input :type="passwordFieldType" v-model="password" id="password" placeholder="Contraseña" required/>
                            <c-button @click="togglePasswordVisibility" :style="'background-color: '+passwordVisibilityColor">
                                <font-awesome-icon :icon="passwordVisibilityIcon" size="xl"/>
                            </c-button>
                        </c-input-group>
                    </c-col>
                </c-row>
                <div class="d-flex justify-content-between">
                    <c-button shape="rounded-pill" type="submit" color="primary">Registrar</c-button>
                    <c-button color="link" @click="toLogin" class="text-underline">Inicia sesión</c-button>
                </div>
            </c-form>
          </c-card-body>
        </c-card>
      </c-container>
    </div>
  </template>

  <script>
  export default {
    name: 'Register',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        passwordFieldType: 'password',
        passwordVisibilityIcon: ['far','eye'],
      };
    },
    computed: {
      passwordVisibilityColor() {
        return this.passwordFieldType === 'password' ? '#ededed' : '#0D7AFD';
      },
    },
    methods: {
      registerUser() {
        // Lógica de registro del usuario
        // ...
        // Limpiar los campos después de enviar el formulario
        //alert('los datos que ingresaste son:\n\nNombre: '+this.name+'\n\nEmail: '+this.email+'\n\nConstraseña: '+this.password);
        this.name = '';
        this.email = '';
        this.password = '';
      },
      toLogin() {
        this.$router.push({name: 'Login'});
      },
      togglePasswordVisibility() {
        if (this.passwordFieldType === 'password') {
          this.passwordFieldType = 'text';
          this.passwordVisibilityIcon = ['far', 'eye-slash'];
        } else {
          this.passwordFieldType = 'password';
          this.passwordVisibilityIcon = ['fas', 'eye'];
        }
      },
    },
  };
  </script>

  <style scoped>
  .container {
    max-width: 600px;
  }

  </style>
