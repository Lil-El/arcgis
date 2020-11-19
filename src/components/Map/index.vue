<script>
import { defineComponent, onMounted, reactive, watch } from "vue";
import { loadModules } from "esri-loader";
import useMap from "@/arcgis/map/useMap";
import useZoom from "@/arcgis/widget/useZoom";
import "./index.scss";
export default defineComponent({
  render() {
    return <div id="map"></div>;
  },
  props: {
    widgets: {
      type: Object,
      default: {},
      required: false,
    },
  },
  setup(props, ctx) {
    let { widgets = {} } = props;
    // onMounted(() => {
    console.log(props);
    watch(
      () => widgets,
      (options) => {
        console.log(widgets);
        console.log(options);
      }
    );
    // });
    return { widgets };
    // loadModules([
    //   "esri/Map",
    //   "esri/views/MapView",
    //   "esri/widgets/Compass",
    // ]).then(([Map, MapView, Compass]) => {
    //   let map = new Map({
    //     basemap: "hybrid", // streets，hybrid
    //   });
    //   let view = new MapView({
    //     container: "map",
    //     map,
    //     center: [106, 34.09042],
    //     zoom: 3,
    //   });
    //   let compass = new Compass({ view });
    //   view.ui.add(compass, "top-left");
    //   useZoom(view);
    //   useMap({ map, view });
    // });
  },
});
</script>
