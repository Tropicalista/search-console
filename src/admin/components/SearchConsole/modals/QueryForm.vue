<template>
  <form class="pure-form pure-form-stacked">
      <fieldset>

        <div class="row">
          <select v-model="filter.operator" class="regular-text">
            <option value="contains">Queries containing</option>
            <option value="notContains">Queries not containing</option>
            <option value="equals">Query is exactly</option>
          </select>
        </div>

        <div class="row">
          <input type="text" v-model="filter.expression" required placeholder="keyword" class="regular-text">
          <span class="pure-form-message">This is a required field.</span>
        </div>

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