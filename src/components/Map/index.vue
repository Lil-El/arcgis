<script>
import { defineComponent, onMounted, reactive } from "vue";
import { loadModules } from "esri-loader";
import useStore from "../../store/useStore";
import "./index.scss";
export default defineComponent({
  render() {
    return <div id="map"></div>;
  },
  setup(props, ctx) {
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
      let store = useStore();
      store.map = map;
      store.view = view;
      console.log(useStore());
    });
  },
});
</script>
