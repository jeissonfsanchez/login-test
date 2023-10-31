const path = require('path');

module.exports = {
  // Configuración personalizada de Vue
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    resolve: {
       symlinks: false,
       alias: {
        '@': path.resolve(__dirname, 'vuejs'),
      },
      fallback: {
        "path": require.resolve("path-browserify")
      }
    }
  },
  chainWebpack: config => {
    config.entry('app').clear().add('./vuejs/main.js');
  },

  // Ruta de archivo de salida para archivos estáticos generados
  outputDir: path.resolve(__dirname, 'vuejs/trash'),

  // Rutas de archivo de entrada para archivos estáticos generados
  //indexPath: path.resolve(__dirname, 'resources/views/index.blade.php'),

  // Configuración del servidor de desarrollo de Vue
  devServer: {
    /*static: {
      directory: path.resolve(__dirname, 'vuejs/public'),
    },*/
    host: 'libreria.test',
    https: false,
  },
};
