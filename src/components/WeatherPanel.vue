<template>
  <div class="main">
    <div v-if="weather !== null">
      <div class="main-position">{{ weather.name }}</div>
      <div class="left">{{ toTitleCase(weather.weather[0].description) }}</div>
      <div class="main-weather-basic-info">
        <div><img :src="iconRef" alt=""></div>
        <div class="main-weather-basic-info-temperature">
          <span :style="colorTemperature">{{ formatTemperature(weather.main.temp) }}°C</span>
        </div>
      </div>
      <div class="left">Ощущается как: {{ formatTemperature(weather.main.feels_like) }}°C</div>
      <div class="left">Скорость ветра {{ weather.wind.speed }} м/с</div>
    </div>
  </div>
</template>

<script>
import {onMounted, computed} from "vue";
import {useStore} from "vuex";

export default {
  name: 'WeatherPanel',
  setup() {
    const store = useStore();
    const weather = computed(() => store.state.weather);
    const formatTemperature = (temp) => {
      if (temp > 0) {
        return `+${temp}`.slice(0,-1)
      }
    };
    const toTitleCase = (str) => {
      return (str.charAt(0).toUpperCase() + str.slice(1))
    }
    const colorTemperature = computed(()=> {
      if (weather.value.main.temp<0) {
        return {color: "#0000ff"};
      }
      else if (15>=weather.value.main.temp>0){
        return {color:"#3399ff"};
      }
      else if (25>=weather.value.main.temp>15){
        return {color:"#ff8c1a"};
      } else if (weather.value.main.temp>25){
        return {color:"#ff0000"};
      }
      return {color:"#000000"};
    })
    const iconRef = computed(() => {
      if (weather.value !== null) {
        return `http://openweathermap.org/img/wn/${weather.value.weather[0].icon}@2x.png`
      }
      return `http://openweathermap.org/img/wn/01d@2x.png`
    });
    onMounted(() => {
      store.dispatch("getWeather")
      setInterval(() => store.dispatch("getWeather"), 300000);
    });
    return {
      weather,
      formatTemperature,
      toTitleCase,
      iconRef,
      colorTemperature
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.main-position {
  font-size: 24px;
}

.main-weather-basic-info-temperature {
  font-size: 38px;
  align-self: center;
  align-content: center;
}

.left {
  text-align: left;
}

.main div {
  padding: 5px;
}

.main-weather-basic-info {
  display: flex;
  align-self: center;
  align-content: center;
}
</style>
