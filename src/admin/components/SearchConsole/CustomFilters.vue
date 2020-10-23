<template>
  <ul class="custom-filters">

    <li>
      <a class="filter-button" @click="showModalForm('searchTypeModal')">Search type:{{searchType}}<i class="search icon"></i></a>
    </li>

    <li><a class="filter-button" v-for="filter in filters">
      <span @click="showModalForm(filter, true)">{{filter.dimension}}:{{filter.expression}}</span><i class="icon-cancel" @click="resetFilter(filter)"></i>
    </a>
    </li>
    
    <li class="dropdown" :class="{ active: isActive }">
        <a class="pure-button pure-button-primary" @click="openDropDown" v-on-clickaway="away">New <i class="dashicons dashicons-plus"></i></a>
        <ul class="dropdown-content">
            <li class="item" v-for="option in options" @click="showModalForm(option.value)">
                <a>{{option.text}}</a>
            </li>
        </ul>
    </div>
    </li>

    <transition name="modal">
    <mymodal v-if="showModal" @close="showModal = false" @clickAwayModal="showModal = false">
      <!--
        you can use custom content here to overwrite
        default content
      -->
        <h3 slot="header">Select a filter</h3>

        <template slot="body">
          <component :is="modalType" ref="myform" :dates="dates" :searchType="searchType"></component>
        </template>

        <template slot="footer">
          <a class="btn btn-danger" @click="showModal = false">
            Cancel
          </a>
          <a class="btn btn-primary" @click="sendValue()">
            Ok
          </a>
        </template>
    </mymodal>
    </transition>

  </ul>
</template>

<script>

import mymodal from 'admin/components/Modal.vue'
import searchTypeModal from 'admin/components/SearchConsole/modals/SearchType.vue'
import deviceForm from 'admin/components/SearchConsole/modals/DeviceForm.vue'
import queryForm from 'admin/components/SearchConsole/modals/QueryForm.vue'
import pageForm from 'admin/components/SearchConsole/modals/PageForm.vue'
import { mixin as clickaway } from 'vue-clickaway'
import dateranges from './sources/dateranges.js'

export default {
  mixins: [ clickaway ],
  props: ['dates','searchType','filters'],
  data() {
    return {
      isActive: false,
      drop: '',
      showModal: false,
      showCloseIcon: false,
      closeOnClickAway: true,
      modalType: '',
      options: [
        {
          value: 'queryForm',
          text: 'Query'
        },
        {
          value: 'pageForm',
          text: 'Page'
        },
        {
          value: 'deviceForm',
          text: 'Device'
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
    showModalForm (value, addForm) {
      if(addForm){
        value = value.dimension + 'Form'
      }
      this.modalType = value
      this.showModal = true
    },
    sendValue () {
      if(this.$refs.myform.$options._componentTag == 'searchTypeModal'){
        //this.searchType = this.$refs.myform.search
        this.$events.fire('change-searchType', this.$refs.myform.search)
      }else{
        if(this.$refs.myform.filter.expression){
          this.$events.fire('add-filter', this.$refs.myform.filter)
        }
      }
      this.showModal = false
    },
    resetFilter (filter) {
      let idx = this.filters.indexOf(filter)
      this.filters.splice(idx,1)
      this.$events.fire('remove-filter', filter)
    },
    openDropDown () {
      this.isActive = !this.isActive
    },
    onDateSelected (daterange) {

    },
    away () {
      this.isActive = false
    }
  },
  components: {
    mymodal,
    deviceForm,
    pageForm,
    queryForm,
    searchTypeModal
  }
}
</script>
<style>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown.active .dropdown-content {
  display: block;
}

.dropdown.active .item a {
  display: block;
  margin-bottom: 0;
}

.dropdown.active .item a:hover {
  background-color: #ddd;
}

.filter-button {
  background-color: #1e90ff;
  color: #fff;
  margin-right: 10px;
}

.filter-button:hover {
  color: #fff;
}

</style>