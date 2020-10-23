<template>
	<div class="">
	    <div class="input-container">
			<select class="input-field" @change="setDate" v-model="selected">
				<option>Choose a daterange</option>
			    <option v-for="d in ranges" :value="d.value">{{d.label}}</option>
			</select>
            <v-date-picker
				@input="setDateVcalendar"
				:columns="2"
				v-model="selectedVcalendar"
				:max-date='new Date()'
				mode="range" show-caps 
				:popover="{ placement: 'bottom-end', visibility: 'click' }">
            	<button class="inputaddon-item pure-button pure-button-primary"><i class="icon-calendar"></i></button>
            </v-date-picker>                	
	    </div>

	</div>

</template>
<script>
export default {
    props: ['dates'],
    data () {
    	return {
    		selected: this.dates,
    		selectedVcalendar: {start:this.dates.startDate, end: this.dates.endDate},
			ranges: [
		        { 
		        	label: 'Last 28 Days', 
		        	value: {
		        		startDate: this.dayjs().subtract(27, 'days').format( "YYYY-MM-DD" ), 
		        		endDate: this.dayjs( new Date() ).format( "YYYY-MM-DD" )
		        		}
		        },
		        { 
		        	label: 'Last Month', 
		        	value: {
		        		startDate: this.dayjs().subtract(1, 'month').startOf('month').format( "YYYY-MM-DD" ), 
		        		endDate: this.dayjs().subtract(1, 'month').endOf('month').format( "YYYY-MM-DD" )
		        		}
		        },
		        { 
		        	label: 'Last 3 Months', 
		        	value: {
		        		startDate: this.dayjs().subtract(3, 'month').startOf('month').format( "YYYY-MM-DD" ), 
		        		endDate: this.dayjs().subtract(1, 'month').endOf('month').format( "YYYY-MM-DD" )
		        		}
		        },
		        { 
		        	label: 'Last 6 Months', 
		        	value: {
		        		startDate: this.dayjs().subtract(6, 'month').startOf('month').format( "YYYY-MM-DD" ), 
		        		endDate: this.dayjs().subtract(1, 'month').endOf('month').format( "YYYY-MM-DD" )
		        		}
		        },
		        { 
		        	label: 'Last 12 Months', 
		        	value: {
		        		startDate: this.dayjs().subtract(12, 'month').startOf('month').format( "YYYY-MM-DD" ), 
		        		endDate: this.dayjs().subtract(1, 'month').endOf('month').format( "YYYY-MM-DD" )
		        		}
		        },
		        { 
		        	label: 'Last 16 Months', 
		        	value: {
		        		startDate: this.dayjs().subtract(16, 'month').startOf('month').format( "YYYY-MM-DD" ), 
		        		endDate: this.dayjs().subtract(1, 'month').endOf('month').format( "YYYY-MM-DD" )
		        		}
		        }
			]
    	}
    },
    methods: {
        setDate () {
        	this.$events.fire('set-date', this.selected)
        },
        setDateVcalendar (dates) {
        	this.selected = {
        		startDate: this.dayjs(dates.start).format( "YYYY-MM-DD" ), 
        		endDate: this.dayjs(dates.end).format( "YYYY-MM-DD" )
        	}
        	this.setDate()
        }
    }
}
</script>