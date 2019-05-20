import Vue from 'vue';
import App from './App.vue';
import router from './Routes/index.js';
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import VModal from 'vue-js-modal'

Vue.use(VModal, { dialog: true });

Vue.use(Vuesax);
Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
