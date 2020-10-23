<template>
<form class="pure-form pure-form-stacked">
    <fieldset>

        <select v-model="filter.operator" class="three wide column">
          <option value="contains">URLs containing</option>
          <option value="notContains">URLs not containing</option>
          <option value="equals">URL is exactly</option>
        </select>

        <input type="text" v-model="filter.expression" required placeholder="http://www.example.com/foo">
        <span class="pure-form-message">This is a required field.</span>

    </fieldset>
</form>

</template>
<script>

export default {
  data() {
    return {
      isActive: false,
      filter: {
        operator: 'contains',
        dimension: "page"
      }
    }
  }
}
</script>