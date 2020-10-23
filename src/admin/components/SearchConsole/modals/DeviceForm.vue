<template>
  <form class="pure-form pure-form-stacked">
    <fieldset>
        <label for="desktop">
        <input type="radio" value="desktop" v-model="device" @change="setFilter(device)">
          Desktop
        </label>

        <label for="mobile">
        <input type="radio" value="mobile" v-model="device" @change="setFilter(device)">
          Mobile
        </label>

        <label for="tablet">
        <input type="radio" value="tablet" v-model="device" @change="setFilter(device)">
          Tablet
        </label>


    </fieldset>
  </form>
</template>
<script>

export default {
  data() {
    return {
      device: null,
      filter: null
    }
  },
  methods: {
    setFilter (device) {
      this.filter = {
        dimension: "device",
        operator: "equals",
        expression: device        
      }      
    }
  }
}
</script>