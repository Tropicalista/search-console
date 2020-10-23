<template>
    <div class="search-console">
        <search-console v-if="loaded" />
    </div>
</template>

<script>
import SearchConsole from 'admin/components/SearchConsole/Home.vue'

export default {
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            if(!vm.$store.getters.config.token || !vm.$store.getters.config.site){
                next('/settings')
            }
        })
    },
    data () {
		return {
			loaded: false
		}
    },
    mounted () {
        this.loaded = true
    },
    components: {
		SearchConsole
    }
}
</script>