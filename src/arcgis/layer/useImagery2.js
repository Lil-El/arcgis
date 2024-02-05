import ImageryLayer from "@arcgis/core/layers/ImageryLayer";
import * as rasterFunctionUtils from "@arcgis/core/layers/support/rasterFunctionUtils";
import RasterStretchRenderer from "@arcgis/core/renderers/RasterStretchRenderer";
import RasterFunction from "@arcgis/core/layers/support/RasterFunction";
import useMap from "../map/useMap";

const renderer = () => {
  const { map, view } = useMap();

  //#region
  // DEM
  let DEMUrl = "https://portal.beidouhj.com/server/rest/services/DEM/ImageServer";
  // 桑树坪DEM
  let definitionExpression1 = `dcpc like '2022年12月12日至2022年12月12日%' AND ksbm = 'C1000002008091120000816'`;
  // 曹家滩DEM
  let definitionExpression2 = `dcpc like '2023年7月18日至2023年8月29日%' AND ksbm = 'C6100002017111110145309'`;
  //#endregion

  if (map.findLayerById("IMAGERY_LAYER")) {
    map.remove(map.findLayerById("IMAGERY_LAYER"));
  } else {
    const layer = new ImageryLayer({
      id: "IMAGERY_LAYER",
      url: DEMUrl,
      definitionExpression: definitionExpression2,
    });

    layer.when(() => {
      const renderer = new RasterStretchRenderer({
        stretchType: "min-max",
        colorRamp: {
          type: "algorithmic",
          fromColor: [22, 160, 133, 1],
          toColor: [192, 57, 43, 1],
        },
        minPercent: 0.25,
        maxPercent: 0.75,
        statistics: [
          {
            min: 249.91815185546875,
            max: 1800.0870361328125,
            avg: 1202.4008372700707,
            stddev: 196.57500450818426,
          },
        ],
      });

      layer.renderer = renderer;

      view.goTo(layer.fullExtent);
    });

    map.add(layer);
  }
};

export default () => {
  const { map, view } = useMap();

  //#region
  // 地表沉降，url 、sql
  let SubsidenceUrl = "https://portal.beidouhj.com/server/rest/services/Subsidence_t/ImageServer";
  let definitionExpression = `dcpc like '2020年11月27日至2021年11月10日%' AND ksbm = 'C6100002017111110145309'`;

  // DEM
  let DEMUrl = "https://portal.beidouhj.com/server/rest/services/DEM/ImageServer";
  // 桑树坪DEM
  let definitionExpression1 = `dcpc like '2022年12月12日至2022年12月12日%' AND ksbm = 'C1000002008091120000816'`;
  // 曹家滩DEM
  let definitionExpression2 = `dcpc like '2023年7月18日至2023年8月29日%' AND ksbm = 'C6100002017111110145309'`;
  //#endregion

  if (map.findLayerById("IMAGERY_LAYER")) {
    map.remove(map.findLayerById("IMAGERY_LAYER"));
  } else {
    const layer = new ImageryLayer({
      id: "IMAGERY_LAYER",
      url: DEMUrl,
      definitionExpression: definitionExpression2,
    });

    layer.when(() => {
      const stretchFunction = new RasterFunction({
        rasterFunction: "Stretch",
        rasterFunctionArguments: {
          StretchType: 5,
          Statistics: [
            [50, 200, 56.7, 54.8],
            [100, 300, 97.5, 94.5],
            [150, 400, 87.5, 87.3],
          ],
          Min: 0,
          Max: 255,
        },
        outputPixelType: "U8",
        variableName: "Raster",
      });

      const colorFunction = new RasterFunction({
        functionName: "Colormap",
        functionArguments: {
          ColorrampName: "Elevation #1",
          // Raster: stretchFunction,
        },
        outputPixelType: "U8",
      });
      // console.log(rasterFunctionUtils);
      // const colormap = rasterFunctionUtils.colormap({
      //   colorRampName: "Elevation #1", // Blue Bright
      // });

      layer.rasterFunction = colorFunction;

      view.goTo(layer.fullExtent);
    });

    map.add(layer);
  }
};
