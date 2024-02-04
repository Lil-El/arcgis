<script lang="jsx">
// 使用 render jsx 语法时，需要在 script 中添加 lang="jsx"

import { defineComponent } from "vue";
import useMap from "@/arcgis/map/useMap";

export default defineComponent({
  props: ["widgets"],
  render () {
    return <div id="map"></div>;
  },
  setup () {
    setTimeout(() => {
      
      useMap();
    }, 1000);
  },
});
</script>

<style lang="scss">
#map {
  flex: 1;
  height: 100vh;
}
</style>
