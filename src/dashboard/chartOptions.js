export default {
  width: '100%',
  height: '400',
  colors: [
    //'#4285f4', '#00bcd4', '#009688', '#673ab7', 'E8710A'
    '#4285f4', '#5e35b1', '#00897b', '#E8710A'
  ],
  //curveType: 'function',
  //theme: 'material',
  smoothline: 'true',
  focusTarget: 'category',
  chartArea: {
    // leave room for y-axis labels
    width: '100%',
    height: '80%'
  },
  hAxis: {
    gridlines: {
      count: 0,
      minSpacing: 150
    },
    minorGridlines: { count: 0 },
    showTextEvery: 1,
    format: 'MMM dd'
  },
  vAxis: {
    gridlines: {
      count: 0,
      minSpacing: 100
    },
    minorGridlines: { count: 2 },
    showTextEvery: 2
  },
  vAxes: {
      //0: {direction: -1, maxValue:1, textPosition: 'none'},
      0: {direction: -1, textPosition: 'none'},
      1: {textPosition: 'none' },
      2: {textPosition: 'none' },
      3: {textPosition: 'none' }
  },
  series: {
      0: { type: "line", targetAxisIndex: 1, tooltip: true },
      1: { type: "line", targetAxisIndex: 2, tooltip: true },
      2: { type: "line", targetAxisIndex: 3, tooltip: true },
      3: { type: "line", targetAxisIndex: 0, tooltip: true },
      4: { type: "line", targetAxisIndex: 0, tooltip: true }
  }
}