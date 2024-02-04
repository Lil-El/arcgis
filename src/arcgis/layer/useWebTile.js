import WebTileLayer from "@arcgis/core/layers/WebTileLayer";
import useMap from "../map/useMap";

/**
 * Tips:
 * 对于底图的图层，可以 new BaseMap(), 设置底图图层
 * 将 baseMap 设置给 map
 * 而不是直接设置底图图层给 map.layers
 */
export default () => {
  const { map } = useMap();

  if (map.findLayerById("WEB_TILE_LAYER")) {
    map.remove(map.findLayerById("WEB_TILE_LAYER"));
  } else {
    const layer = new WebTileLayer({
      id: "WEB_TILE_LAYER",
      urlTemplate:
        "https://{subDomain}.tianditu.gov.cn/DataServer?T=vec_w&x={col}&y={row}&l={level}&tk=6e1e9ac0ebd562e9bdf36dcc14f2ea60",
      subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
      title: "北斗环境-天地图",
    });
    map.add(layer);
  }
};
