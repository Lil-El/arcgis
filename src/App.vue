<template>
  <div>
    <div>
      <div>Count: {{ state.count }}</div>
      <div>Double: {{ state.double }}</div>
      <button @click="increment">COUNT++</button>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
import { computed, onMounted, reactive } from "vue";
export default {
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2),
      age: "arcgis",
    });
    function increment() {
      state.count++;
    }
    onMounted(handleMounted);
    return {
      state,
      increment,
    };
  },
};
function handleMounted() {
  loadModules(["esri/Map", "esri/views/MapView"]).then(([Map, MapView]) => {
    let map = new Map({
      basemap: "hybrid", // streets，hybrid
    });

    let view = new MapView({
      container: "map",
      map,
      center: [106, 34.09042],
      zoom: 3,
    });
  });
}
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 500px;
}
</style>
