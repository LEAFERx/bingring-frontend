import Vue from 'vue';
import VCharts from 'v-charts'
import App from './App.vue';
import store from './store';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

Vue.use(VCharts);
Vue.use(Buefy);

import mqtt from 'mqtt';
const client = mqtt.connect('ws://bingring.leaferx.ink:8083/mqtt');
Vue.prototype.$mqtt = client;

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
  created() {
    const commit = this.$store.commit;

    client.on('connect', () => {
      commit('updateBrokerStatus', 1);
    });

    client.on('close', () => {
      commit('updateBrokerStatus', 0);
    });

    client.on('offline', () => {
      commit('updateBrokerStatus', 2);
    });

    client.subscribe('alive');
    client.subscribe('alarm_status');
    client.subscribe('alarm_data');

    let timer = 0;

    client.on('message', (topic, payload) => {
      if (topic === 'alive') {
        if (this.$store.state.onlineStatus === false) {
          commit('updateOnlineStatus', true);
        }
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          commit('updateOnlineStatus', false);
        }, 8000);
      }
      if (topic === 'alarm_status') {
        if (this.$store.state.onlineStatus === false) {
          commit('updateOnlineStatus', true);
        }
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          commit('updateOnlineStatus', false);
        }, 8000);
        const status = Number(payload.toString());
        commit('updateAlarmStatus', status);
        if (status === 0) {
          commit('clearAlarmData');
        }
      }
      if (topic === 'alarm_data') {
        if (this.$store.state.onlineStatus === false) {
          commit('updateOnlineStatus', true);
        }
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          commit('updateOnlineStatus', false);
        }, 8000);
        const data = payload.toString();
        commit('pushAlarmData', data);
      }
    })
  },
}).$mount('#app');
