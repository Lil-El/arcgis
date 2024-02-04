import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

const store = { map: null, view: null };

export default () => {
  if (store.map && store.view) return store;

  store.map = new Map({
    basemap: "hybrid", // streets，hybrid, topo-vector (需要连接 VPN)
  });

  store.view = new MapView({
    container: "map",
    map: store.map,
    center: [106, 34.09042],
    zoom: 3,
  });

  return store;
};
