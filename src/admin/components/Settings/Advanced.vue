<template>
	<div>

		<div class="row">
			<div class="description">
				<b>Add verification to site?</b>
			</div>
			<div class="fields">
				<input type="checkbox" v-model="webmasters.siteVerification" @change="getVerification">
				<i class="dashicons dashicons-update spin" v-show="showSpinner"></i>
			</div>
		</div>

		<div class="row">
			<div class="description">
				<b>Verification meta</b>
			</div>
			<div class="fields">
				<input type="text" class="regular-text" v-model="webmasters.meta">
			</div>
		</div>

		<div class="row">

		    <div class="description">
				<b>Custom credentials</b>
		    </div>
		    <div class="fields">
				<input type="checkbox" v-model="settings.custom_credentials" @change="validate()">
				<input type="checkbox" v-model="settings.reset_token" class="hidden">
		    </div>

		</div>

		<div v-if="show">
			<div class="row">
			    <div class="description">
					<b>Client ID</b>
			    </div>
			    <div class="fields">
					<input type="text" class="pure-input-1-4" v-model="settings.credentials.clientId">
					<span>Please go to Analytics settings to set up your view</span>
			    </div>
			</div>

			<div class="row">
			    <div class="description">
					<b>Client secret</b>
			    </div>
			    <div class="fields">
					<input type="text" class="pure-input-1-4" v-model="settings.credentials.clientSecret">
					<span>Please go to Search Console settings to set up your site</span>
			    </div>
			</div>

			<div class="row">
			    <div class="description">
					<b>Redirect url</b>
			    </div>
			    <div class="fields">
					<input type="text" class="pure-input-1-4" v-model="settings.credentials.redirectUri">
					<span>Please go to Search Console settings to set up your site</span>
			    </div>
		    </div>
		</div>

	</div>
</template>

<script>
export default {

    name: 'Advanced',
    data () {
        return {
			show: this.$store.getters.settings.custom_credentials,
            settings: this.$store.getters.settings,
			showSpinner: false,
            webmasters: this.$store.getters.webmasters,
        }
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
   		getToken () {
			this.axios
		    .post('/token', {
				code: this.code
		    })
			.then( response => {
				// handle success
				this.$store.commit('setToken', response.data.access_token)
				this.getSites()
				//this.$store.dispatch('initialize')
			})

		},
		setSelected (site) {
			console.log(event.target.value)
			if(event.target.value){
				this.$store.commit('setSite', event.target.value)
				this.getVerification()		
			}else{
				this.site = ''
			}
		},
		getVerification () {

			if(this.webmasters.siteVerification && this.webmasters.site.length){

				this.showSpinner = true
				let mm = this
				gapi.client.load('siteVerification', 'v1').then(function(r){
                        
                gapi.auth.setToken({access_token:mm.token})

                //gapi.auth.setToken({access_token:this.$store.getters.config.token})
                gapi.client.siteVerification.webResource.getToken({
					"verificationMethod": "META",
					"site": {
						"identifier": mm.$store.getters.site.replace('sc-domain:', ''),
						"type": "SITE"
					}
                }).then(function(r){
                    mm.webmasters.meta = r.result.token;
					mm.showSpinner = false
                })

              })

			}
		},
		revoke () {
			this.axios
		    .delete('/token')
			.then( response => {
				// handle success
				this.$store.dispatch('initialize')
			})			
		}
    }
};
</script>