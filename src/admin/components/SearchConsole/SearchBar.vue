<template>
    <div class="input-container">
      <input class="input-field" type="text" v-model="searchFor" @keyup.enter.prevent="doFilter" placeholder="keyword">
      <span class="icon-field" @click.prevent="doFilter"><i class="icon-search"></i></span>
    </div>
</template>

<script>
export default {
  data () {
    return {
      searchFor: ''
    }
  },
  methods: {
    doFilter () {
      this.$events.fire('filter-setSearch', this.searchFor)
    },
    resetFilter () {
      this.searchFor = ''
      this.$events.fire('filter-resetSearch')
    }
  }
}
</script>
<style>
.input-container {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  width: 100%;
}

.icon-field {
  padding: 10px;
  background: dodgerblue;
  color: white;
  min-width: 50px;
  text-align: center;
}

.input-field {
  width: 100%;
  padding: 10px;
  outline: none;
  border-radius: 0!important;
  margin: 0!important;
}

.input-field:focus {
  border: 2px solid dodgerblue;
}
</style>