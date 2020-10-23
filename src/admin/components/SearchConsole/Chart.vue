<template>
    <div class="v-select">
        <GChart
          type="LineChart"
          :data="chartData"
          :options="chartOptions"
          :events="chartEvents"
          ref="chart"
        />        
    </div>
</template>
<script>
import chartOptions from 'admin/components/SearchConsole/sources/chartOptions.js'
export default {
    props: ['dimension','filters', 'searchType', 'searchFor', 'dates'],
    data () {
        return {
            chartData: [],
            chartOptions: chartOptions,
            chartEvents: {
                'select': (e) => {
                    const chart = this.$refs.chart.chartObject;
                    var col = chart.getSelection()[0].column
                    if(!col){return}

                        var selection = chart.getSelection();       
                        //var view = new google.visualization.DataView(this.chartData);

                        // click and data index are one off
                        var i = selection[0].column - 1;
                        chartOptions.series[i].tooltip = !chartOptions.series[i].tooltip


                    // just simple reverse
                    if (chartOptions.series[i].lineWidth == 0) {
                          chartOptions.series[i].lineWidth = 2;
                          chartOptions.series[i].areaOpacity = 0.3;
                    }
                    else {
                          chartOptions.series[i].lineWidth = 0;
                          chartOptions.series[i].areaOpacity = 0.0;            
                    }

                    chart.draw(this.chartData, chartOptions);

                }
            },
        }
    },
    mounted (){

        gapi.client.load('webmasters', 'v3')
            .then(() => {

                gapi.auth.setToken({access_token:this.$store.getters.config.token})
                this.getData()  
            })

    },
    methods: {
        getData () {
            gapi.client.webmasters.searchanalytics.query(
                {
                    'siteUrl': this.$store.getters.site,
                    'rowLimit': null,
                    'searchType': this.searchType,
                    'startDate': this.dates.startDate,
                    'endDate': this.dates.endDate,
                    'dimensions': ['date'],
                    'dimensionFilterGroups': [{
                        'filters': this.filters
                    }]
                })
                .then((response) => {
                    this.chartData = this.formatData(response.result.rows)
                })
                .then(null, function(err) {
                    console.log(err);
                });      
        },
        formatData(rows) {
            let mm = this
            var data = new google.visualization.DataTable();
            data.addColumn('date', 'Keys');
            data.addColumn('number', 'Clicks');
            data.addColumn('number', 'Impressions');
            data.addColumn('number', 'CTR');
            data.addColumn('number', 'Position');

            _.forEach(rows, function(row){
              data.addRow([
                mm.dayjs(row.keys[0]).toDate(),
                row.clicks,
                row.impressions,
                (row.ctr * 100),
                parseFloat(row.position)
              ]);
            })
          return data      
        }

    }
}
</script>