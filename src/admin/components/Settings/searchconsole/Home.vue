<template>
	<div class="pure-g form-div">

		<div class="pure-u-1-5 l-box">
			<b>Choose site</b>
		</div>
		<div class="pure-u-4-5 l-box">
			<div class="select-site">
				<v-select label="siteUrl" :options="sites" v-model="webmasters.site" :value="selected" @input="setSelected"></v-select>
			</div>
		</div>

		<div class="pure-u-1-5 l-box">
			<b>Add verification to site?</b>
		</div>
		<div class="pure-u-4-5 l-box">
			<input type="checkbox" v-model="webmasters.siteVerification" @change="getVerification">
			<i class="dashicons dashicons-update spin" v-show="showSpinner"></i>
		</div>

		<div class="pure-u-1-5 l-box">
			<b>Verification meta</b>
		</div>
		<div class="pure-u-4-5 l-box pure-form">
			<input type="text" class="pure-input-1-4" v-model="webmasters.meta">
		</div>

    </div>
</template>

<script>
export default {

    name: 'Settings',
    data () {
        return {
			selected: '',
			sites: [],
			showSpinner: false,
            webmasters: this.$store.getters.webmasters
        }
    },
	computed: {
	  token () {
		return this.$store.getters.token
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
    methods: {
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
    	authenticate () {
			window.open(this.$store.getters.authUrl, '', 'width=400,height=600');
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
			if(site){
				this.$store.commit('setSite', site)
				this.getVerification()		
			}else{
				this.site = ''
			}
		},
		getVerification () {
			this.showSpinner = true

			if(this.webmasters.siteVerification && this.webmasters.site.length){

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