<template>
    <div class="input-container">
      <input class="input-field" type="text" v-model="searchFor" @keyup.enter.prevent="doFilter" placeholder="keyword">
      <span class="icon-field" @click.prevent="doFilter"><i class="dashicons" :class="{'dashicons-no': isActive, 'dashicons-search': !isActive}"></i></span>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: false,
      searchFor: ''
    }
  },
  methods: {
    doFilter () {
      if( this.searchFor.length ){
        this.isActive = !this.isActive;
      }
      if( !this.isActive ){
        this.searchFor = ''
      }
      this.$events.fire('filter-setSearch', this.searchFor)

    },
    resetFilter () {
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
  cursor: pointer;
}
.icon-field i {
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