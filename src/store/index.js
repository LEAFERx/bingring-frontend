import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  brokerStatus: 0, // 0: broker offline; 1: broker online; 2: client offline;
  onlineStatus: false,
  alarmStatus: 0,
  alarmData: {
    hr: [],
    temp: [],
  },
};

const mutations = {
  updateBrokerStatus(state, status) {
    state.brokerStatus = status;
  },
  updateOnlineStatus(state, status) {
    state.onlineStatus = status;
  },
  updateAlarmStatus(state, status) {
    state.alarmStatus = status;
  },
  pushAlarmData(state, data) {
    console.log(data);
    const timeString = (new Date()).toLocaleTimeString();
    let [hr, temp] = data.split(',');
    hr = Number(hr);
    temp = Number(temp);
    if (hr === 0) {
      return;
    }
    state.alarmData.hr.push({
      time: timeString,
      value: hr,
    });
    state.alarmData.temp.push({
      time: timeString,
      value: temp,
    })
  },
  clearAlarmData(state) {
    state.alarmData = {
      hr: [],
      temp: [],
    };
  },
};

export default new Vuex.Store({
  state,
  mutations,
});