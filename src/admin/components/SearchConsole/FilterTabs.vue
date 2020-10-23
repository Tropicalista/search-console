<template>
    <div class="filter-bar">
        <ul>
            <li><a class="tabs" :class="{active: dimension == 'query'}" @click="doFilter('query')">Query
        </a>
            </li>
            <li><a class="tabs" :class="{active: dimension == 'page'}" @click="doFilter('page')">Pages
        </a>
            </li>
            <li><a class="tabs" :class="{active: dimension == 'country'}" @click="doFilter('country')">Countries
        </a>
            </li>
            <li><a class="tabs" :class="{active: dimension == 'device'}" @click="doFilter('device')">Devices
        </a>
            </li>
        </ul>
        <div class="bar-field">
            <search-bar />
        </div> 
    </div>
</template>
<script>
import SearchBar from 'admin/components/SearchConsole/SearchBar.vue'
export default {
    props: ['dimension'],
    methods: {
        doFilter (value) {
            this.$events.fire('set-dimension', value)
        }
    },
    components: {
        SearchBar
    }
}
</script>
<style>
  .filter-bar {
    display: flex;
    padding: 1em 0 1em 1em;
    font-family: sans-serif;
    border: 1px solid #ddd;
    border-top: 0;
    border-left: 0;
    border-right: 0;
  }
  .filter-bar > ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex: 3;
  }
  .filter-bar li a {
    display: block;
    padding: 8px 16px;
    text-decoration: none;
  }
  .filter-bar a:hover {
    cursor: pointer;
  }
  .filter-bar > .bar-field {
    display: flex;
    justify-content: flex-end;
    flex: 1;
  }
  .filter-bar input {
    flex: 1;
  }
  .filter-bar button {
    background: white;
    border: 0;
    border-radius: 1em;
    color: orangered;
    padding: 0 1em;
    margin-left: .3em;
  }
</style>