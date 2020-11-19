<template>
    <div class="pure-g">
		<div>
			<Chart ref="chart" :dates="dates" :filters="filters" />
		</div>

		<div class="filter-bar">
			<custom-filters :searchType="searchType" :dates="dates" :filters="filters" />
			<date-range :presets="ranges" />
		</div>

		<div class="sc-alert">
			<h3>Altough I don't like to add messages on WP dashbooard, I really need some reviews. Please, can you help me?</h3>
			<p>This message will be completely removed once I'll have enough reviews. Thanks. <a hre="https://wordpress.org/support/plugin/search-console/reviews/" class="button button-primary">Review it now!</a></p>
		</div>

		<filter-tabs :dimension="dimension" />

		<Table :dimension="dimension" :filters="filters" :searchFor="searchFor" :searchType="searchType" :dates="dates" ref="table" />

    </div>
</template>

<script>
import Table from 'admin/components/SearchConsole/Table.vue'
import DateRanges from 'admin/components/SearchConsole/DateRanges.vue'
import FilterTabs from 'admin/components/SearchConsole/FilterTabs.vue'
import SearchBar from 'admin/components/SearchConsole/SearchBar.vue'
import CustomFilters from 'admin/components/SearchConsole/CustomFilters.vue'
import Chart from 'admin/components/SearchConsole/Chart.vue'
import DateRange from 'admin/components/DateRange.vue'
import Vue from 'vue'
export default {

    name: 'SearchConsole',

    data () {
		return {
			dates: {
				startDate: this.dayjs().subtract(27, 'days').format( "YYYY-MM-DD" ),
				endDate: this.dayjs( new Date() ).format( "YYYY-MM-DD" ),
			},
			dimension: 'query',
			searchFor: "",
			searchType: "web",
			filters: [],
			ranges: [
			{ 
				label:'Last Week',
				value: { 
					start: dayjs().startOf('week').subtract(6, 'days'), 
					end: dayjs().startOf('week')
				}
			},
			{ 
				label:'Last 28 Days',
				value: { 
					start: dayjs().subtract(27, 'days'), 
					end: dayjs()
				}
			},
			{ 
				label:'Last Month',
				value: { 
					start: dayjs().subtract(1, 'month').startOf('month'), 
					end: dayjs().subtract(1, 'month').endOf('month')
				}
			},
			{ 
				label:'Last 3 Months',
				value: { 
					start: dayjs().subtract(3, 'month').startOf('month'), 
					end: dayjs().subtract(1, 'month').endOf('month')
				}
			}]
		}
    },
    mounted () {
		this.$events.$on('update-range', eventData => this.setDate(eventData))
		this.$events.$on('set-dimension', eventData => this.setDimension(eventData))
		this.$events.$on('remove-filter', eventData => this.removeFilter(eventData))
		this.$events.$on('add-filter', eventData => this.setFilter(eventData))
		this.$events.$on('change-searchType', eventData => this.setSearchType(eventData))
		this.$events.$on('filter-setSearch', eventData => this.onFilterSetSearch(eventData))
		this.$events.$on('filter-resetSearch', e => this.onFilterResetSearch())
    },
    methods: {
		getData(){
			Vue.nextTick( () => { 
				this.$refs.table.getData()
				this.$refs.chart.getData()
			} )
		},
		doFilter () {
			Vue.nextTick( () => this.$refs.table.$refs.vuetable.refresh() )
		},
		setSearchType (value) {
			this.searchType = value
			this.getData()
		},
		onFilterSetSearch (filterText) {
			this.searchFor = filterText
			this.doFilter()
		},
		onFilterResetSearch () {
			this.searchFor = ''
			this.doFilter()
		},
		setFilter (filter) {
			var index = _.findIndex(this.filters, {dimension: filter.dimension})
			if(!index){
				this.filters.splice(index, 1, filter);
			}else{
				this.filters.push(filter)
			}
			this.getData()
		},
		removeFilter (filter) {
			_.remove(this.filters, filter);
			this.getData()
		},
		setDimension (value) {
			this.dimension = value
			this.getData()
		},
		setDate (dates) {
			this.dates = {
				startDate: dates.start,
				endDate: dates.end
			}
			this.getData()
		}

    },
    components: {
		Chart,
		FilterTabs,
		SearchBar,
		CustomFilters,
		Table,
		DateRange
    }
}
</script>
<style>
.sc-alert{
	padding: 10px;
}
</style>