export default {
	width: '100%',
	height: '400',
	colors: [ '#4285f4', '#5e35b1', '#00897b', '#E8710A' ],
	animation: {
		duration: 1000,
		easing: "out",
		startup: true,
	},
	focusTarget: 'category',
	chartArea: {
		// leave room for y-axis labels
		width: '100%',
		height: '80%',
	},
	hAxis: {
		gridlines: {
			count: 0,
			minSpacing: 150,
		},
		minorGridlines: { count: 0 },
		showTextEvery: 1,
		format: 'MMM dd',
	},
	vAxis: {
		gridlines: {
			count: 0,
			minSpacing: 100,
		},
		minorGridlines: { count: 1 },
		showTextEvery: 2,
	},
	vAxes: {
		0: { title: 'clicks' },
		1: { title: 'impressions' },
		2: {
			format: '#%',
		},
		3: {
			direction: -1,
		},
	},
	series: {
		0: { type: 'line', targetAxisIndex: 0, tooltip: true }, // Clicks
		1: { type: 'line', targetAxisIndex: 1, tooltip: true }, // Impressions
		2: { type: 'line', targetAxisIndex: 2, tooltip: true }, // CTR
		3: { type: 'line', targetAxisIndex: 3, tooltip: true }, // Positions
	},
};
