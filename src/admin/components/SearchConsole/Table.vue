<template>
  <div class="dashy-gsc-container">

    <vuetable ref="vuetable" 
      :api-mode="false"
      :fields="fields"
      :data-total="dataCount"
      :data-manager="dataManager"
      pagination-path="pagination"
      :per-page="perPage"
      :css="mycss.table"
      @vuetable:cell-clicked="onCellClicked"
      @vuetable:pagination-data="onPaginationData"
    >
    </vuetable>

    <vuetable-pagination ref="pagination" 
      :css="mycss.pagination"
      class="pull-right"
      @vuetable-pagination:change-page="onChangePage"
    ></vuetable-pagination>

      <div class="paging pull-right">
          <select v-model="perPage" class="" @change="doFilter">
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
      </div>

  </div> 
</template>

<script>
import Vuetable from 'vuetable-2'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination.vue'
import Countries from './sources/countries.js'
import FieldDefs from './sources/fieldDefs.js'
import mycss from './sources/vuetablecss.js'
import VueEvents from 'vue-events'
import Vue from 'vue'
export default {
    name: 'Home',
    props: ['dimension','filters', 'searchType', 'searchFor', 'dates'],
    data () {
        return {
            mycss: mycss,
            localData: [],
            perPage: 10,
            dataCount: 0,
            ranges: {
                'Last Week': [this.dayjs().startOf('week').subtract(6, 'days'), this.dayjs().startOf('week')],
                'Last 28 Days': [this.dayjs().subtract(27, 'days'), this.dayjs()],
                'Last Month': [this.dayjs().subtract(1, 'month').startOf('month'), this.dayjs().subtract(1, 'month').endOf('month')],
                'Last 3 Months': [this.dayjs().subtract(3, 'month').startOf('month'), this.dayjs().subtract(1, 'month').endOf('month')],
                'Last 6 Months': [this.dayjs().subtract(6, 'month').startOf('month'), this.dayjs().subtract(1, 'month').endOf('month')],
                'Last 12 Months': [this.dayjs().subtract(12, 'month').startOf('month'), this.dayjs().subtract(1, 'month').endOf('month')],
                'Last 16 Months': [this.dayjs().subtract(16, 'month').startOf('month'), this.dayjs().subtract(1, 'month').endOf('month')]
            },
            fields: FieldDefs,
            columns: [
                'clicks',
                'ctr',
                'impressions',
                'keys',
                'position'
            ]      
        }
    },
    mounted() {


        gapi.client.load('webmasters', 'v3')
            .then(() => {

                gapi.auth.setToken({access_token:this.$store.getters.config.token})
                this.getData()  
            })

        this.$events.$on('refresh-table', eventData => this.getData())
        this.$refs.vuetable.setData(this.localData);
    },
    watch: {
        localData (newVal, oldVal) {
            this.$refs.vuetable.refresh()
        }
    },
    methods: {
        keyFormat(value) {
          return value[0]
        },
        ctrFormat(value) {
          return (value * 100).toFixed(2) + '%'
        },
        onPaginationData(paginationData) {
          this.$refs.pagination.setPaginationData(paginationData);
        },
        onChangePage(page) {
          this.$refs.vuetable.changePage(page);
        },
        dataManager(sortOrder, pagination) {

            let data = this.localData;

            // account for search filter
            if (this.searchFor) {
                // the text should be case insensitive
                let txt = new RegExp(this.searchFor, "i");
                // search on name, email, and nickname
                data = _.filter(data, function(item) {
                    return (
                    item.keys[0].search(txt) >= 0
                    );
                });
            }

            // sortOrder can be empty, so we have to check for that as well
            if (sortOrder.length > 0) {
                data = _.orderBy(data, sortOrder[0].sortField, sortOrder[0].direction);
            }

            // since the filter might affect the total number of records
            // we can ask Vuetable to recalculate the pagination for us
            // by calling makePagination(). this will make VuetablePagination
            // work just like in API mode
            pagination = data ? this.$refs.vuetable.makePagination(data.length) : '';

            // if you don't want to use pagination component, you can just
            // return the data array
            return {
                pagination: pagination,
                data: _.slice(data, pagination.from - 1, pagination.to)
            };
        },
        doFilter () {
            Vue.nextTick( () => this.$refs.vuetable.refresh() )
        },
        onCellClicked(value, field, event){
            if(this.dimension == 'country' ){
                value.keys[0] = _.findKey(Countries, function(item) { return item.indexOf(value.keys[0]) !== -1; })
            }
            this.localData = this.formatData([value])
            this.$events.fire('add-filter', {
                "dimension": this.dimension,
                "operator": "equals",
                "expression": value.keys[0]              
            })
            this.doFilter()

        },
        resetFilter () {
            this.searchFor = ''
            this.$refs.vuetable.refresh()
        },
        setDate (date) {
            this.startDate = this.dayjs(date.startDate).format("YYYY-MM-DD")
            this.endDate = this.dayjs(date.endDate).format("YYYY-MM-DD")
            this.getData()
        },
        formatData(rows) {
            _.forEach(rows, function(row){
                //row.ctr = (row.ctr * 100).toFixed(2),
                row.position = parseFloat(row.position).toFixed(2)
                if(row.keys[0] == undefined){
                  row.keys[0] = ''
                }
            })
            return rows      
        },
        getData () {
            gapi.client.webmasters.searchanalytics.query(
                {
                'siteUrl': this.$store.getters.site,
                'fields': 'rows',
                'rowLimit': null,
                'searchType': this.searchType,
                'startDate': this.dates.startDate,
                'endDate': this.dates.endDate,
                'dimensions': [this.dimension],
                'dimensionFilterGroups': [{
                    'filters': this.filters
                    }]
            })
            .then((response) => {
                if(this.dimension == 'country'){
                    _.forEach(response.result.rows, (row) => {
                        row.keys[0] = Countries[row.keys[0]]
                    })
                }
                this.localData = this.formatData(response.result.rows)
            })
            .then(null, function(err) {
                console.log(err);
            });      
        }
    },
    components: {
        Vuetable,
        VuetablePagination
    }
}
</script>
