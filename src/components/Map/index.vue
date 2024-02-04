<script>
import { defineComponent, getCurrentInstance, onMounted, reactive, watch } from "vue";
import useMap from "@/arcgis/map/useMap";
// import { widgetFn } from "@/arcgis/widget/use";
export default defineComponent({
  props: ["widgets"],
  render () {
    return <div id="map"></div>;
  },
  setup (props, ctx) {
    useMap();
  },
});
</script>

<style lang="scss">
#map {
  flex: 1;
  height: 100vh;
}
</style>
