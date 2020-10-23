<template>
<form class="pure-form pure-form-stacked">
    <fieldset>

      <div class="row">
        <select v-model="filter.operator" class="regular-text">
          <option value="contains">URLs containing</option>
          <option value="notContains">URLs not containing</option>
          <option value="equals">URL is exactly</option>
        </select>        
      </div>
      <div class="row">
        <input type="text" v-model="filter.expression" class="regular-text" required placeholder="http://www.example.com/foo">
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
        dimension: "page"
      }
    }
  }
}
</script>