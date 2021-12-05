import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    weather: null
  },
  getters: {
    weather: (state) => state.weather,
  },
  mutations: {
    setWeather: (state, weather) => state.weather = weather
  },
  actions: {
    getWeather(context) {
      axios.get("https://api.openweathermap.org/data/2.5/weather?q=Krasnodar&&lang=ru&units=metric&appid=47b5301436d43023222b4daf57f08e0a").then(res => {
        context.commit("setWeather", res.data);
      })
    }
  }
})
