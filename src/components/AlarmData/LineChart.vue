<template>
  <ve-line :data="chartData"
           :settings="chartSettings"
           :extend="extend"
           :dataEmpty="dataEmpty"
           >
  </ve-line>
</template>
 <script>
 import 'v-charts/lib/style.css';

export default {
  name: 'LineChart',
  props: [
    'title',
    'rawData',
    'valueName',
    'legendName',
    'color',
  ],
  data() {
    const data = {
      chartSettings: {
        dimension: ['time'],
        metrics: ['value'],
        labelMap: {
          value: this.legendName,
        },
        //xAxisType: 'time',
      },
      extend: {
        itemStyle: {
          color: this.color,
        },
        title: {
          text: this.title,
        },
        series: {
          smooth: false,
        },
        'xAxis.0.axisLabel.rotate': 45,
      },
      chartData: {
        columns: ['time', 'value'],
        rows: this.rawData,
      },
    };
    return data;
  },
  computed: {
    dataEmpty() {
      return this.rawData.length === 0;
    },
  },
}
</script>
 