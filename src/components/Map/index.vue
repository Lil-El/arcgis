<script lang="jsx">
// 使用 render jsx 语法时，需要在 script 中添加 lang="jsx"

import { defineComponent, onMounted } from "vue";
import useMap from "@/arcgis/map/useMap";

export default defineComponent({
  render () {
    return <div id="map"></div>;
  },
  setup () {
    onMounted(useMap);
  },
});
</script>

<style lang="scss">
#map {
  flex: 1;
  height: 100vh;
}
</style>
