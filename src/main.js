import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jQuery from 'jquery'
import VueFirestore from 'vue-firestore'
import 'firebase/firestore';
import {fb} from './firebase'
import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/app.scss';

window.$ = window.jQuery = jQuery;
Vue.config.productionTip = false
Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})
Vue.component('Navbar', require('./components/Navbar.vue').default);
import Swal from 'sweetalert2'
window.Swal = Swal;
let app = '';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

window.Toast = Toast;


fb.auth().onAuthStateChanged(function(user) {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }
});

