<template>
  <section class="columns" style="padding: 50px">
    <div class="column is-half">
      <LineChart title="Heart Rate"
                :rawData="alarmData.hr"
                legendName="Heart Rate"
                color="#ff0000">
      </LineChart>
      <LineChart title="Temperature"
                :rawData="alarmData.temp"
                legendName="Temperature">
      </LineChart>
    </div>
    <div class="column is-half">
      <Map></Map>
    </div>
  </section>
</template>

<script>
import LineChart from './AlarmData/LineChart';
import Map from './AlarmData/Map';

export default {
  name: 'AlarmData',
  components: {
    LineChart,
    Map,
  },
  computed: {
    alarmData() {
      return this.$store.state.alarmData;
    },
  },
}
</script>
