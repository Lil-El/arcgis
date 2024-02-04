<template>
  <div class="container">
    <side-bar />
    <Map />
  </div>
</template>

<script>
import { computed, onMounted, reactive, watch } from "vue";
import Map from "@/components/Map";
import SideBar from "@/components/SideBar";
export default {
  components: { Map, SideBar },
  setup () {
  },
};
</script>
<style lang="scss">
.container {
  display: flex;
  height: 100vh;
}
</style>