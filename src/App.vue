<template>
  <div id="app">
    <section class="hero is-medium is-warning is-bold">
      <div class="hero-body has-text-centered">
        <div class="container">
          <h1 class="title is-size-1">
            Bing Ring
          </h1>
          <h2 class="subtitle is-size-4">
            Monitoring Dashboard
          </h2>
        </div>
      </div>
    </section>
    <nav class="level" style="padding: 50px;">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Broker Status</p>
          <p :class="[{'has-text-danger': brokerStatus !== 1, 'has-text-success': brokerStatus === 1}, 'title']">{{ brokerStatusText }}</p>
        </div>
      </div>
      <div class="has-text-grey-light">|</div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Online Status</p>
          <p :class="[{'has-text-danger': !onlineStatus, 'has-text-success': onlineStatus}, 'title']">{{ onlineStatusText }}</p>
        </div>
      </div>
      <div class="has-text-grey-light">|</div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Alarm Status</p>
          <p :class="[{'has-text-danger': alarmStatus, 'has-text-success': !alarmStatus}, 'title']">{{ alarmStatusText }}</p>
        </div>
      </div>
      <div class="has-text-grey-light">|</div>
      <div class="level-item has-text-centered">
        <div>
          <b-button @click="confirmReset" type="is-danger" size="is-medium" outlined rounded :disabled="alarmStatus === 0" icon-left="undo">Reset Alarm</b-button>
        </div>
      </div>
    </nav>
    <AlarmData v-if="alarmStatus !== 0"></AlarmData>
    <div class="columns" style="padding: 50px; margin-top: 50px;" v-else>
      <div class="column has-text-centered">
        <p class="has-text-success" style="font-size: 70px;">No Alarm</p>
        <p class="is-size-4 has-text-grey is-italic">Everything is just fine <b-icon icon="emoticon"></b-icon></p>
      </div>
    </div>
  </div>
</template>

<script>
import AlarmData from './components/AlarmData';

export default {
  name: 'app',
  components: {
    AlarmData,
  },
  computed: {
    brokerStatus() {
      return this.$store.state.brokerStatus;
    },
    brokerStatusText() {
      switch (this.$store.state.brokerStatus) {
        case 0:
          return 'Broker Offline';
        case 1:
          return 'Broker Online';
        case 2:
          return 'No Network';
      }
      return '';
    },
    onlineStatus() {
      return this.$store.state.onlineStatus;
    },
    onlineStatusText() {
      if (this.onlineStatus) {
        return 'Device Online';
      } else {
        return 'Device Offline';
      }
    },
    alarmStatus() {
      return this.$store.state.alarmStatus;
    },
    alarmStatusText() {
      switch (this.$store.state.alarmStatus) {
        case 0:
          return 'None';
        case 1:
          return 'High Fall';
        case 2:
          return 'Fall';
        case 3:
          return 'Severe Fall';
        case 4:
          return 'Manual Alarm';
      }
      return '';
    },
  },
  methods: {
    confirmReset() {
      this.$dialog.confirm({
        message: 'Are you sure you want to <b>reset</b> this alarm? This action cannot be undone.',
        confirmText: 'Reset Alarm',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.resetAlarm(),
      });
    },
    resetAlarm() {
      this.$mqtt.publish('alarmStatus', JSON.stringify({ status: 0 }));
      this.$mqtt.publish('reset_alarm', "1", {
        retain: true,
      });
    }
  }
}
</script>
