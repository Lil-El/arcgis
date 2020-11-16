<template>
  <div>
    <div>
      <span class="test">arcgis</span>
      <div>Count: {{ state.count }}</div>
      <div>Double: {{ state.double }}</div>
      <button @click="increment">COUNT++</button>
    </div>
    <Map />
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
import { computed, onMounted, reactive } from "vue";
import Map from "@/components/Map";
import useStore from "@/store/useStore";
export default {
  components: { Map },
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2),
      age: "arcgis",
    });
    function increment() {
      state.count++;
    }
    return {
      state,
      increment,
    };
  },
};
</script>