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
					Save settings <i v-if="spin" class="dashicons dashicons-update spin"></i>
				</button>
			</div>
		</div>

    </div>
</template>

<script>
import Advanced from 'admin/components/Settings/Advanced.vue'
import Basic from 'admin/components/Settings/Basic.vue'

export default {

	computed: {
		settings () {
			return this.$store.getters.settings
		}
	},
    data () {
        return {
			tabs: ["Basic", "Advanced"],
			selected: "Basic",
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
		Basic,
		Advanced
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
.dashicons.spin {
   animation: dashicons-spin 1s infinite;
   animation-timing-function: linear;
}

@keyframes dashicons-spin {
   0% {
      transform: rotate( 0deg );
   }
   100% {
      transform: rotate( 360deg );
   }
}
</style>