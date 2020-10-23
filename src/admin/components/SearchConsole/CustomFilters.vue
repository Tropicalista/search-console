<template>
  <div class="">

    <a class="pure-button pure-button-primary filter-button" @click="showModalForm('searchTypeModal')">Search type:{{searchType}}<i class="search icon"></i></a>

    <a class="pure-button pure-button-primary filter-button" v-for="filter in filters">
      <span @click="showModalForm(filter, true)">{{filter.dimension}}:{{filter.expression}}</span><i class="icon-cancel" @click="resetFilter(filter)"></i>
    </a>

    <div class="dropdown" :class="{ active: isActive }">
        <a class="pure-button pure-button-primary" @click="openDropDown" v-on-clickaway="away">New <i class="icon-plus"></i></a>
        <div class="dropdown-content">
            <div class="item" v-for="option in options" @click="showModalForm(option.value)">
                <a>{{option.text}}</a>
            </div>
        </div>
    </div>

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
          <div class="pure-button button-error modal-default-button filter-button" @click="showModal = false">
            Cancel
          </div>
          <div class="pure-button pure-button-primary modal-default-button" @click="sendValue()">
            Ok
          </div>
        </template>
    </mymodal>
    </transition>

  </div>
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
        this.$events.fire('add-filter', this.$refs.myform.filter)
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