<template>
  <form class="pure-form pure-form-stacked">
      <fieldset>

          <select v-model="filter.operator">
            <option value="contains">Queries containing</option>
            <option value="notContains">Queries not containing</option>
            <option value="equals">Query is exactly</option>
          </select>

          <input type="text" v-model="filter.expression" required placeholder="keyword">
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
        dimension: "query"
      }
    }
  }
}
</script>