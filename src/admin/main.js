//import './less/style.less'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import menuFix from './utils/admin-menu-fix'
import axios from 'axios'
import { slice, merge, map } from 'lodash'
import dayjs from 'dayjs'
import store from './store/newStore'
import VueEvents from 'vue-events'
import VueGoogleCharts from 'vue-google-charts'
import vSelect from 'vue-select'
import Notifications from 'vue-notification'
import 'vue-select/dist/vue-select.css';

window.dayjs = dayjs
window.axios = axios 

axios.defaults.headers.common = {
	/* eslint-disable no-undef */
	'X-WP-Nonce': _nonce
}

// apply interceptor on response
axios.interceptors.response.use(
	response => response,
	errorResponseHandler
);

axios.defaults.baseURL = sc_baseurl.siteurl + '/wp-json/searchconsole/api'

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.axios = axios
Vue.prototype.dayjs = dayjs

Vue.use(VueEvents)
Vue.use(VueGoogleCharts)
Vue.use(Notifications)

Vue.component('v-select', vSelect)

/* eslint-disable no-undef */
gapi.load('client', () => {

	axios
		.get('/config')
		.then(r => r.data)
		.then(config => {
			store.commit('setConfig', config)

			/* eslint-disable no-new */
			new Vue({
				el: '#vue-admin-app',
				router,
				store,
				//store: store(config),
				render: h => h(App)
			})

		})

})

function errorResponseHandler(error) {
	// check for errorHandle config
	if( error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false ) {
		return Promise.reject(error);
    }

     // if has response show the error
	if (error.response) {
		Vue.notify({
			group: 'errors',
			title: 'Error message',
			type: 'error',
			text: error.response.data.message
		})
	}
}


// fix the admin menu for the slug "vue-app"
menuFix('search-console');