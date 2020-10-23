import axios from 'axios'

const config = {

		state: {
			config: {},
			loading: false
		},
		mutations: {
		    setConfig (state, config) {
				state.config = config
		    },
		    setProfile (state, profile) {
				state.config.profile = profile
		    },
		    setSite (state, site) {
				state.config.site = site
		    },
		    setToken (state, token) {
				state.config.token = token
		    }
		},
		getters: {
			config: state => state.config,
			authUrl: state => state.config.authUrl,
			site: state => state.config.site,
			token: state => state.config.token,
			profile: state => state.config.profile
		},
		actions: {

		}

}

export default config