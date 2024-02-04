import TileLayer from "@arcgis/core/layers/TileLayer";
import useMap from "../map/useMap";

export default () => {
  const { map, view } = useMap();

  if (map.findLayerById("TILE_LAYER")) {
    map.remove(map.findLayerById("TILE_LAYER"));
  } else {
    const layer = new TileLayer({
      id: "TILE_LAYER",
      url: "https://portal.beidouhj.com/server/rest/services/Hosted/C6100002017111110145309_CaoJiaTan/MapServer",
    });

    layer.when(() => {
      view.goTo(layer.fullExtent);
    });

    map.add(layer);
  }
};
