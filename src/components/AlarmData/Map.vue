<template>
  <ve-amap
    height="800px"
    :settings="chartSettings"
    :series="chartSeries">
  </ve-amap>
</template>

<script>
export default {
  name: 'Map',
  data () {
    this.chartSettings = {
      key: 'cb01ef84761f2a37ce30caa187c8f3ac',
      v: '1.4.3',
      amap: {
        resizeEnable: true,
        center: [121.5949280000, 31.1769850000],
        zoom: 17,
      },
    };
    return {
      chartSeries: [
        {
          type: 'scatter',
          symbol: 'pin',
          symbolSize: 30,
          coordinateSystem: 'amap',
          itemStyle: {
            color: '#ff0000',
          },
          data: [
            [121.5949280000, 31.1769850000] // 经度，维度，value，...
          ],
          tooltip: {
            formatter: 'Current Position',
          },
        }
      ]
    }
  }
}
</script>
