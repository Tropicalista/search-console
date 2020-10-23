<template>
	<div>
		<div class="pure-g form-div" v-if="!token">
		    <div class="pure-u-1-1 l-box">
			</div>
		    <div class="pure-u-1-5 l-box">
				<b>Request access token</b>
		    </div>
		    <div class="pure-u-4-5 l-box">
				<button class="pure-button pure-button-primary" @click="authenticate()">Get Google Authorization Code</button>
		    </div>

		    <div class="pure-u-1-5 l-box">
		    </div>
		    <div class="pure-u-4-5 l-box">
		        <div class="pure-form">
					<div class="inputaddon pure-u-1-4">
						<input class="inputaddon-field pure-input-1-4" v-model="code" type="text">
						<button class="inputaddon-item pure-button pure-button-primary" @click.prevent="getToken">Authenticate</button>
					</div>
				</div>
				<p class="description">Paste here the response code and then click Authenticate button to receive your token.</p>
		    </div>

	    </div>

		<div class="pure-g form-div" v-if="token">
		    <div class="pure-u-1-5 l-box">
				<b>Revoke token</b>
		    </div>
		    <div class="pure-u-4-5 l-box">
					<button class="pure-button button-secondary" @click="revoke()">Revoke access</button>
		    </div>

		    <div class="pure-u-1-5 l-box">
				<b>Search Console site</b>
		    </div>
		    <div class="pure-u-4-5 l-box">
				<span v-if="showWebmasters">{{config.site}}</span>
				<span v-if="!showWebmasters">Please go to Search Console settings to set up your site</span>
		    </div>

	    </div>

		<div class="pure-g form-div">

		    <div class="pure-u-1-5 l-box">
				<b>Custom credentials</b>
		    </div>
		    <div class="pure-u-4-5 l-box">
				<input type="checkbox" v-model="settings.custom_credentials" @change="validate()">
				<input type="checkbox" v-model="settings.reset_token" hidden>
		    </div>

			<div v-if="show">
			    <div class="pure-u-1-5 l-box">
					<b>Client ID</b>
			    </div>
			    <div class="pure-u-4-5 l-box pure-form">
					<input type="text" class="pure-input-1-4" v-model="settings.credentials.clientId">
					<span>Please go to Analytics settings to set up your view</span>
			    </div>

			    <div class="pure-u-1-5 l-box">
					<b>Client secret</b>
			    </div>
			    <div class="pure-u-4-5 l-box pure-form">
					<input type="text" class="pure-input-1-4" v-model="settings.credentials.clientSecret">
					<span>Please go to Search Console settings to set up your site</span>
			    </div>

			    <div class="pure-u-1-5 l-box">
					<b>Redirect url</b>
			    </div>
			    <div class="pure-u-4-5 l-box pure-form">
					<input type="text" class="pure-input-1-4" v-model="settings.credentials.redirectUri">
					<span>Please go to Search Console settings to set up your site</span>
			    </div>
			</div>

	    </div>
    </div>
</template>

<script>
export default {

    name: 'Authentication',
    data () {
        return {
			code: '',
			show: this.$store.getters.settings.custom_credentials,
            config: this.$store.getters.config,
            settings: this.$store.getters.settings,
            showAnalytics: false,
            showWebmasters: false
        }
    },
    mounted () {
    	this.showDetails()
    },
	computed: {
	  token () {
	    return this.$store.getters.token
	  }
	},
    methods: {
    	validate () {
    		this.show = ! this.show
    		this.settings.reset_token = ! this.settings.reset_token
    	},
    	authenticate () {
    		if(this.settings.custom_credentials){
				//window.open(this.settings.credentials.redirectUri, '', 'width=400,height=600'); something mess the code
				window.open(this.settings.credentials.redirectUri, '_blank');
    		}else{
				window.open(this.$store.getters.config.authUrl, '', 'width=400,height=600');
    		}
    	},
	    getToken () {
	    	this.axios
	        .post('/token', {
	          code: this.code
	        })
			.then( response => {
				// handle success
				this.$store.commit('setToken', response.data.access_token)
			})

	    },
	    showDetails () {
	    	if(this.settings.analytics.account.length && 
	    		this.settings.analytics.webprop.length &&
	    		this.settings.analytics.profile.length
	    		){
	    		this.showAnalytics = true
	    	}
	    	if(this.settings.webmasters.site.length){
	    		this.showWebmasters = true
	    	}
	    },
	    revoke () {
	    	this.axios
	        .delete('/token')
			.then( response => {
				this.$store.commit('setToken', '')
				// reset code just in case
				this.code = ''
			})

	    }
    }
};
</script>