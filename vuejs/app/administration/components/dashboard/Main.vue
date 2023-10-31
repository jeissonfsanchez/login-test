<template>
    <div>
      <Sidebar />
      <div class="c-wrapper">
        <Header />
        <div class="c-body">
          <MainContent />
        </div>
        <Footer />
      </div>
    </div>
  </template>

  <script>
  import Sidebar from './Sidebar.vue';
  import Header from './Header.vue';
  import MainContent from './MainContent.vue';
  import Footer from './Footer.vue';

  export default {
    name: 'Dashboard',
    components: {
      Sidebar,
      Header,
      MainContent,
      Footer,
    },
  };
  </script>

  <style>
  /* Estilos globales del dashboard aquí */
  </style>
