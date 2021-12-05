<template>
  <div class="hello">
    <div v-if="weather !== null">
      <div>{{ weather.name }}</div>
      <div>{{formatTemperature(weather.main.temp)}}</div>
      <div>Ощущается как {{formatTemperature(weather.main.feels_like)}}</div>
      <div>{{weather.weather[0].description}}</div>
      <div>Скорость ветра {{weather.wind.speed}} м/с</div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: 'WeatherPanel',
  setup() {
    const store = useStore();
    const weather = computed(() => store.state.weather);
    const formatTemperature = (temp)=>{
      if (temp>0) {
        return `+${temp}`
      }
    };
    onMounted(() => {
      store.dispatch("getWeather")
      setInterval(() => store.dispatch("getWeather"), 3000000);
    });
    return {
      weather,
      formatTemperature
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
</style>
