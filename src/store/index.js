import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    weather: null,
    position: null
  },
  getters: {
    weather: (state) => state.weather,
    position: (state) => state.position,
  },
  mutations: {
    setWeather: (state, weather) => state.weather = weather,
    setPosition: (state, position) => state.position = position
  },
  actions: {
    async getWeather(context) {
      await context.dispatch("getPosition")
      const position = context.getters.position
      await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${position}&&lang=ru&units=metric&appid=47b5301436d43023222b4daf57f08e0a`).then(res => {
        context.commit("setWeather", res.data);
      })
    },
    async getPosition(context){
      await axios.get("http://ip-api.com/json").then(res => {
        context.commit("setPosition", res.data.city);
      })
    }
  }
})
