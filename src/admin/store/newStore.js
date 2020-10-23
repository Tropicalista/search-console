import Vue from 'vue'
import Vuex from 'vuex'

import config from './modules/config.js';
import settings from './modules/settings.js';

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		config,
		settings
	}
})

export default store