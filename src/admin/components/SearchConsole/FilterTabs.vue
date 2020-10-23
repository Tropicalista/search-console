<template>
    <div class="filter-bar">
        <a class="tabs" :class="{active: dimension == 'query'}" @click="doFilter('query')">Query
        </a>
        <a class="tabs" :class="{active: dimension == 'page'}" @click="doFilter('page')">Pages
        </a>
        <a class="tabs" :class="{active: dimension == 'country'}" @click="doFilter('country')">Countries
        </a>
        <a class="tabs" :class="{active: dimension == 'device'}" @click="doFilter('device')">Devices
        </a>        
    </div>
</template>
<script>
export default {
    props: ['dimension'],
    methods: {
        doFilter (value) {
            this.$events.fire('set-dimension', value)
        }
    }
}
</script>