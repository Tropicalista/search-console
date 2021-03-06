<template>
    <div class="bar-field datedropdown" :class="{ active: isActive }" v-on-clickaway="away">

        <div class="input-container" @click="openDropDown()">
            <input type="text" disabled class="input-field" v-model="outputRange">
            <span class="icon-field">
                <i class="dashicons dashicons-calendar-alt"></i>
            </span>
        </div>
        <div class="datedropdown-content">
            <div class="dropdown-panel">
                <div class="presets-container">
                    <ul>
                        <li v-for="p in presets"><a @click="setPresets(p)">{{p.label}}</a></li>
                    </ul>
                    <div class="calendar-buttons">
                        <a class="btn btn-danger" @click="away">Cancel</a>
                        <a class="btn btn-primary" @click="send()">Apply</a>
                    </div>
                </div>
                <div class="calendar-container">
                    <div class="calendar">
                        <div class="toolbar">
                            <div><a @click="prev"><i class="dashicons dashicons-arrow-left-alt2"></i></a></div>
                            <div>{{currentMonthDate.subtract(1,'months').format('MMM')}}</div>
                            <div><a @click="next"><i class="dashicons dashicons-arrow-right-alt2"></i></a></div>
                        </div>
                        <div class="calendar-grids">
                            <div v-for="n in monthNames"><b>{{n}}</b></div>
                            <div v-for="(day, index) in prevMonth" :style="{ gridColumn: column2(index) }" :class="[ isSelected(day) ? 'highlight' : '', isSelectedRange(day) ? 'range' : '', isAfter(day) ? '' : 'disabled', isBefore(day) ? '' : 'disabled' ]">
                                <a @click="checkDate(day)">{{ day.format('D') }}</a>
                            </div>
                        </div>
                    </div>
                    <div class="calendar">
                        <div class="toolbar">
                            <div><a @click="prev"><i class="dashicons dashicons-arrow-left-alt2"></i></a></div>
                            <div>{{currentMonthDate.format('MMM')}}</div>
                            <div><a @click="next"><i class="dashicons dashicons-arrow-right-alt2"></i></a></div>
                        </div>
                        <div class="calendar-grids">
                            <div v-for="n in monthNames"><b>{{n}}</b></div>
                            <div v-for="(day, index) in month" :style="{ gridColumn: column(index) }" :class="[ isSelected(day) ? 'highlight' : '', isSelectedRange(day) ? 'range' : '', isAfter(day) ? '' : 'disabled', isBefore(day) ? '' : 'disabled' ]">
                                <a @click="checkDate(day)">{{ day.format('D') }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

  </div>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway'
import localeData from 'dayjs/plugin/localeData'
import 'dayjs/locale/en'

export default {
  mixins: [ clickaway ],
  props: ['presets'],
	computed: {
		outputRange () {
            if(this.selectedRange.length > 1){
                return this.selectedRange ? this.start.format('MMM D YYYY') + ' - ' + this.end.format('MMM D YYYY') : '' // this.selectedRange[0].format('MM-DD-YYYY') + '-' + this.selectedRange[1].format('MM-DD-YYYY') : ''
            }
		}
	},
	data() {
		return {
			currentMonthDate: dayjs(),
			month: [],
			prevMonth: [],
			monthNames: [],
			start: dayjs().add(-28, 'days'),
			end: dayjs(),
			selectedRange: [],
			maxDate: dayjs(),
			minDate: dayjs().add(-60, 'days'),
            isActive: false
		};
	},

	mounted () {
        dayjs.extend(localeData) // use plugin
        dayjs.locale('en') // use locale

        this.monthNames = dayjs().localeData().weekdaysMin()
        this.getMonths(dayjs().startOf('month'))

        this.selectedRange = [this.start,this.end]
  },
	methods: {
        openDropDown () {
            this.isActive = !this.isActive
        },
        send (){
            this.$events.fire('update-range', {
                start: this.start.format('YYYY-MM-DD'), 
                end: this.end.format('YYYY-MM-DD')
            })
            this.openDropDown()
		    },
        isSelected (date) {
          if(date.isBefore(this.end, 'day') && date.isAfter(this.start, 'day')){
            return true
          }
          if(date.isSame(this.start, 'day') || date.isSame(this.end, 'day')){
            return true
          }
          return false
        },
        isAfter (date) {
          if(date.isAfter(this.maxDate, 'day')){
            return false
          }
          return true
        },
        isBefore (date) {
          if(date.isBefore(this.minDate, 'day')){
            return false
          }
          return true
        },
        isSelectedRange (date) {
          if(date.isSame(this.start, 'day') || date.isSame(this.end, 'day')){
            return true
          }
          return false
        },
        column(index) {
          if (index == 0) {
            return this.month[0].day() + 1
          }
        },
        column2(index) {
          if (index == 0) {
            return this.prevMonth[0].day() + 1
          }
        },
        next () {
          let monthDate = dayjs(this.month[1]).add(1,'months').startOf('month')
          this.getMonths(monthDate)
        },
        prev () {
          let monthDate = dayjs(this.month[1]).add(-1,'months').startOf('month')
          this.getMonths(monthDate)

        },
        getMonths (monthDate) {
          this.currentMonthDate = monthDate
          this.month = [...Array(monthDate.daysInMonth())].map((_, i) => {
            return monthDate.clone().add(i, 'day')
          })

          this.prevMonth = [...Array(monthDate.subtract(1,'months').daysInMonth())].map((_, i) => {
            return monthDate.subtract(1,'months').clone().add(i, 'day')
          })
        },
        setRange (date) {

          if(this.selectedRange.length > 1){

            this.clean()

          }

         if(this.selectedRange.length > 0){

            this.end = date
          }else{
            this.start = date
          }

          this.$set(date, 'selected', !date.selected)
          this.selectedRange.push(date)

          if(this.selectedRange.length>1){
            this.checkRange()
            this.start = this.selectedRange[0]
            this.end = this.selectedRange[1]
          }
        },
        selectDay (date) {
          if(date.isBefore(this.start)){
            this.$set(date, 'selected', !value.selected)
          }
        },
        checkDate (date) {
          if(date.isAfter(this.maxDate, 'day')){
            return false
          }
          if(date.isBefore(this.minDate, 'day')){
            return false
          }
          this.setRange(date)

        },
        checkRange () {
          if(this.selectedRange[1].isBefore(this.selectedRange[0])){
            this.selectedRange.reverse()
          }
        },
        setPresets (p) {
            this.start = p.value.start
            this.end = p.value.end
        },
        clean () {
            this.selectedRange = []
            this.start = ''
            this.end = ''
        },
        away () {
            this.isActive = false
        }
	}

}	
</script>
<style>
.datedropdown a {
	cursor: pointer;
	padding: 4px;
}
.dropdown-panel {
	display: flex;
	max-width: 650px;
	max-height: 300px;
	border: 1px solid #ddd;
}
.presets-container {
	flex-grow: 2;
	border-right: 1px solid #ddd;
	position: relative;
  min-width: 140px;
}
.presets-container ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
.presets-container li {
    cursor: pointer;
    margin: 0;
}
.presets-container li:hover {
    background-color: #ddd;
}
.calendar-container {
	display: flex;
	flex-grow: 8;
	background-color: #fff;
}
.calendar {
	flex-grow: 5;
}
.toolbar {
	display: flex;
	padding: 8px;
}
.toolbar > div {
	flex-grow: 1;
}
.toolbar > div:nth-of-type(1) {
    text-align: left;
}
.toolbar > div:nth-of-type(2) {
    text-align: center;
}
.toolbar > div:nth-of-type(3) {
	text-align: right;
}
.calendar-grids {
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	padding: 5px;
}
.calendar-grids > * {
  align-items: center;
  display: flex;
  justify-content: center;
}
.calendar-grids > *::before{
  content: "";
  display: inline-block;
  height: 0;
  width: 1px;
}
.calendar-grids > *.highlight{
  background-color: #def;
}
.calendar-grids > *.highlight.range {
  background-color: #357ebd;
}
.calendar-grids > *.highlight.range a {
  background-color: #357ebd;
  border-radius: 4px;
  color: #fff;
}
.calendar-buttons {
	position: absolute;
	bottom: 0;
	padding: 8px;
}
.datedropdown {
  position: relative;
}

.datedropdown input[type=text][disabled] {
    background-color: #fff;
    cursor: pointer;
    color: #000;
}

.datedropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  right: 0;
  top: 40px;
  font-size: 14px;
}

.datedropdown.active .datedropdown-content {
  display: block;
}

.disabled {
  color: #ddd;
}
</style>