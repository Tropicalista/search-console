<template>
    <div class="dashy-dashboard">
		<notifications group="errors" position="center" />
		<notifications group="settings" position="center" />
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
    data(){
    	return {
    		test: __( 'Trnslate from JS', 'search-console' )
    	}
    },
    created () {
		gapi.auth.setToken({access_token:this.$store.getters.config.token})

    }
}
</script>
<style>
.dashy-wrapper {
	margin-right: 20px;
}
.search-console {
	padding: 20px;
	background-color: white;
	overflow: hidden;
}
a {
	cursor: pointer;
}
.btn {
  color: white;
  padding: 14px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}

.btn:hover {
  color: white;
  text-decoration: none;
}

.btn-primary {
	background-color: #4CAF50;
}

.btn-danger {
	background-color: #f44336;
}

.btn-default {
	background-color: #008CBA;
}

.star {
	color: orange;
}
.red {
	color: red;
}
</style>