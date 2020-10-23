<template>
	<div>
		    <div class="row" v-if="!token">
			    <div class="description">
					<b>Authorize</b>
			    </div>
			    <div class="fields">
					<button class="button button-primary" @click="authenticate()">Get Google Authorization Code</button>
			    </div>
			</div>

		    <div class="row" v-if="!token">
			    <div class="description">
					<b>Request access token</b>
			    </div>
			    <div class="fields">
					<input class="regular-text" v-model="code" type="text">
					<button class="button button-primary" :disabled="!code" @click.prevent="getToken">Authenticate</button>
					<br>
					<span class="descriptionss">Paste here the response code and then click Authenticate button to receive your token.</span>
			    </div>
		    </div>


		<div v-if="token">
			<div class="row">
			    <div class="description">
					<b>Revoke token</b>
			    </div>
			    <div class="fields">
						<button class="pure-button button-secondary" @click="revoke()">Revoke access</button>
			    </div>
			</div>
			<div class="row">
				<div class="description">
					<b>Choose site</b>
				</div>
				<div class="fields">
					<div class="select-site">
						<select label="siteUrl" v-model="webmasters.site" @change="setSelected">
						    <option>Select here</option>
						    <option v-for="site in sites">{{ site }}</option>
						</select>
					</div>
					<span v-if="showWebmasters">{{config.site}}</span>
				</div>
			</div>

	    </div>

    </div>
</template>

<script>
export default {
    name: 'Basic',
    data () {
        return {
			selected: '',
			sites: [],
			code: '',
            config: this.$store.getters.config,
            settings: this.$store.getters.settings,
            webmasters: this.$store.getters.webmasters,
            showWebmasters: false
        }
    },
    mounted () {
        gapi.client.load('webmasters', 'v3')
            .then(() => {
                gapi.auth.setToken({access_token:this.token})
                	if(this.token)
                		this.getSites()
            })
    },
	computed: {
	  token () {
	    return this.$store.getters.token
	  }
	},
    methods: {
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
		setSelected (site) {
			console.log(event.target.value)
			if(event.target.value){
				this.$store.commit('setSite', event.target.value)
				this.getVerification()		
			}else{
				this.site = ''
			}
		},
    	getSites() {
    		let mv = this
    		if(this.token){
				gapi.auth.setToken({access_token:this.token})
		        gapi.client.webmasters.sites.list()
		            .then((s) => {
						_.forEach(s.result.siteEntry, function(site){
							mv.sites.push(site.siteUrl)
						})
		                if(!mv.site){
		                	mv.site = s.result.siteEntry[0]
		                }
					})
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