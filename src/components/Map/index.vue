<script>
import { defineComponent, onMounted, reactive, watch } from "vue";
import useMap from "@/arcgis/map/useMap";
import useZoom from "@/arcgis/widget/useZoom";
import "./index.scss";
export default defineComponent({
  props: ["widgets"],
  render(state) {
    return <div id="map"></div>;
  },
  setup(props, ctx) {
    let { widgets } = props;
    useMap();
    watch(
      () => widgets,
      ({ widgets }) => {
        updateWidgets(widgets);
      },
      { deep: true }
    );
    let updateWidgets = (hooks) => {
      useZoom();
    };
  },
});
</script>
