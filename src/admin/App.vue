<template>
    <div class="dashy-dashboard">
		<notifications group="errors" />
		<notifications group="settings" />
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
    created () {

		gapi.auth.setToken({access_token:this.$store.getters.config.token})

    }
}
</script>
