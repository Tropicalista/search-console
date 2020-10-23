import axios from 'axios'

const settings = {

		state: {
			settings: {
				analytics: {
					account: '',
					webprop: '',
					profile: '',
					settings: {}
				},
				webmasters: {
					site: '',
					siteVerification: '',
					meta: ''
				},
				credentials: {}
			},
			loading: false
		},
		mutations: {
			setSettings (state, settings) {
				state.settings = _.merge(state.settings, settings)
			},
			setAnalytics (state, analytics) {
				state.settings.analytics = analytics
			},
			setWebmasters (state, webmasters) {
				state.settings.webmasters = webmasters
			}
		},
		getters: {
			settings: state => state.settings,
			analytics: state => state.settings.analytics,
			webmasters: state => state.settings.webmasters,
		},
		actions: {
			initialize (){
				axios
					.get('/settings')
					.then(r => r.data)
					.then(settings => {
						this.commit('setSettings', settings)
					})
							
			},
			storeSettings () {
				axios
					.post('/settings', {
					settings: state.settings
					})				
			}

		}

}

export default settings