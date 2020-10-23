<template>
    <div class="pure-form">
        <div class="inputaddon">
            <input class="inputaddon-field pure-input-1-4" type="text" v-model="searchFor" @keyup.enter.prevent="doFilter" placeholder="keyword">
            <button class="inputaddon-item pure-button pure-button-primary" @click.prevent="doFilter"><i class="icon-search"></i></button>
        </div>
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