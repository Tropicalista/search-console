<template>
    <div class="settings">
				
		<h1>Settings</h1>
		
		<h1 class="nav-tab-wrapper">
			<a v-for="tab in tabs" :key="tab" @click="selected = tab;" class="nav-tab" :class="{ 'nav-tab-active': selected == tab }">
				{{ tab }}
			</a>                
		</h1>
		<br>
		<component :is="selected" v-if="loaded"></component>

		<div class="pure-g form-div">
			<div class="pure-u-1-5 row">
			</div>
			<div class="pure-u-4-5 row">
				<button @click="storeSettings()" class="button button-primary">
					Save settings <i v-if="spin" class="icon-spin4 animate-spin"></i>
				</button>
			</div>
		</div>

    </div>
</template>

<script>
import SearchConsole from 'admin/components/Settings/searchconsole/Home.vue'
import Authentication from 'admin/components/Settings/Authentication.vue'

export default {

	computed: {
		settings () {
			return this.$store.getters.settings
		}
	},
    data () {
        return {
			tabs: ["Authentication", "SearchConsole"],
			selected: "Authentication",
			spin: false,
			loaded: false
        };
    },
    mounted () {
		this.axios
			.get('/settings')
			.then(r => r.data)
			.then(settings => {
				this.$store.commit('setSettings', settings)
				this.loaded = true
			})
    },
    methods: {
		storeSettings () {
			let mm = this
			let settings = this.$store.getters.settings
			mm.spinner()

			this.axios
				.post('/settings', {
					settings: settings
				})
				.then( () => {
					mm.spinner()
					mm.showMessage()
				})

		},
		spinner () {
			this.spin = !this.spin
		},
		showMessage () {
			this.$notify({
				group: 'settings',
				title: 'Settings saved',
			});			
		}
    },
	components: {
		Authentication,
		SearchConsole
	}
};
</script>
<style type="text/css">
.row {
	margin-bottom: 10px;
}
.description {
	width: 210px;
	float: left;
	padding: 20px 10px 20px 0;
}
.fields {
	display: inline-block;
	padding: 20px 10px 20px 0;
}
.hidden {
	display: none !important;
}
.fields > span {
	color: #666;
	margin-top: 5px;
}
</style>