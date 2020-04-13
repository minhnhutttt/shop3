import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jQuery from 'jquery'
import {fb} from './firebase'
import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/app.scss';
window.$ = window.jQuery = jQuery;
Vue.config.productionTip = false

Vue.component('Navbar', require('./components/Navbar.vue').default);

let app = '';

fb.auth().onAuthStateChanged(function(user) {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});

