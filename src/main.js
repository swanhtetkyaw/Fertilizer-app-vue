import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store/store';
import { auth } from '@/firebase';

Vue.config.productionTip = false;

let app;

//only recreate if the user is login or logout??
auth.onAuthStateChanged(() => {
	if (!app) {
		app = new Vue({
			router,
			vuetify,
			store,
			render: (h) => h(App)
		}).$mount('#app');
	}
});
