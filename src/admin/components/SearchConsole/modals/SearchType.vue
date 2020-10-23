<template>
  <form class="pure-form pure-form-stacked">
    <fieldset>

        <div class="row">
          <label for="web">
          <input type="radio" value="web" v-model="search">
            Web
          </label>          
        </div>

        <div class="row">
          <label for="image">
          <input type="radio" value="image" v-model="search">
            Image
          </label>          
        </div>
        
        <div class="row">
          <label for="video">
          <input type="radio" value="video" v-model="search">
            Video
          </label>          
        </div>

    </fieldset>

  </form>
</template>
<script>
export default {
  props: ['searchType'],
  data() {
    return {
        search: this.searchType
    }
  }
}
</script>