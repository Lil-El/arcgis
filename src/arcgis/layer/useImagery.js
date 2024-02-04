import ImageryLayer from "@arcgis/core/layers/ImageryLayer";
import useMap from "../map/useMap";

export default () => {
  const { map, view } = useMap();

  if (map.findLayerById("IMAGERY_LAYER")) {
    map.remove(map.findLayerById("IMAGERY_LAYER"));
  } else {
    const layer = new ImageryLayer({
      id: "IMAGERY_LAYER",
      url: "https://portal.beidouhj.com/server/rest/services/Subsidence_t/ImageServer",
      definitionExpression: "dcpc like '2020年11月27日至2021年11月10日%' AND ksbm = 'C6100002017111110145309'",
    });

    layer.when(() => {
      view.goTo(layer.fullExtent);
    });

    map.add(layer);
  }
};
