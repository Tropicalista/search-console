<template>
  <form class="pure-form pure-form-stacked">
    <fieldset>
        <label for="web">
        <input type="radio" value="web" v-model="search">
          Web
        </label>

        <label for="image">
        <input type="radio" value="image" v-model="search">
          Image
        </label>

        <label for="video">
        <input type="radio" value="video" v-model="search">
          Video
        </label>

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