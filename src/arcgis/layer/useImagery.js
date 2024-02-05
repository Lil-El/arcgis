import ImageryLayer from "@arcgis/core/layers/ImageryLayer";
import * as rasterFunctionUtils from "@arcgis/core/layers/support/rasterFunctionUtils";
import useMap from "../map/useMap";

export default () => {
  const { map, view } = useMap();

  //#region
  let 地表沉降 = "https://portal.beidouhj.com/server/rest/services/Subsidence_t/ImageServer";
  let 地表沉降dcpc = "2020年11月27日至2021年11月10日";
  let DEM = "https://portal.beidouhj.com/server/rest/services/DEM/ImageServer";
  let dcpc = "2023年7月18日至2023年8月29日";
  //#endregion

  if (map.findLayerById("IMAGERY_LAYER")) {
    map.remove(map.findLayerById("IMAGERY_LAYER"));
  } else {
    const layer = new ImageryLayer({
      id: "IMAGERY_LAYER",
      url: DEM,
      definitionExpression: `dcpc like '${dcpc}%' AND ksbm = 'C6100002017111110145309'`,
      rasterFunction: rasterFunctionUtils.colormap({
        colorRampName: "Blue Bright",
      }),
    });

    layer.when(() => {
      view.goTo(layer.fullExtent);
    });

    map.add(layer);
  }
};
