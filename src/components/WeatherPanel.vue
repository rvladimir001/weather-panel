<template>
  <div class="hello">
    <div>Погода</div>
    <pre>{{ weather }}</pre>
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
    onMounted(() => {
      store.dispatch("getWeather");
    });
    return {weather}
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
