import ImageryLayer from "@arcgis/core/layers/ImageryLayer";
import ImageryTileLayer from "@arcgis/core/layers/ImageryTileLayer";
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

  // online
  // DEMUrl = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/OsoLandslide/OsoLandslide_After_3DTerrain/ImageServer";

  // test
  // DEMUrl = "https://cportal.beidouhj.com/server/rest/services/image_test/C6100002017111110145309_DEM_CaoJiaTan2023/ImageServer";
  // DEMUrl = "https://cportal.beidouhj.com/server/rest/services/image_test/test_db_1_shixiuan_CaoJiaTan_DEM/ImageServer"
  // DEMUrl = "https://cportal.beidouhj.com/server/rest/services/Hosted/C6100002017111110145309_CaoJiaTan_DEM_2023_001/ImageServer"
  DEMUrl = "https://cportal.beidouhj.com/server/rest/services/image_test/CaoJiaTan2023_DEM_003/ImageServer";
  //#endregion

  if (map.findLayerById("IMAGERY_LAYER")) {
    map.remove(map.findLayerById("IMAGERY_LAYER"));
  } else {
    const layer = new ImageryLayer({
      id: "IMAGERY_LAYER",
      url: DEMUrl,
      // definitionExpression: definitionExpression2,
    });

    layer.when(() => {
      // set 1
      const stretchFunction = new RasterFunction({
        rasterFunction: "Stretch",
        rasterFunctionArguments: {
          StretchType: 5,
          Min: 0,
          Max: 255,
          Raster: "$$",
        },
        outputPixelType: "U8",
        variableName: "Raster",
      });

      let colorFunction = new RasterFunction({
        functionName: "Colormap",
        functionArguments: {
          ColorrampName: "Elevation #1",
          // Raster: stretchFunction,
        },
        outputPixelType: "U8",
        variableName: "Raster",
      });

      // set 2
      const colormap = rasterFunctionUtils.colormap({
        colorRampName: "Elevation #1", // Blue Bright
        // outputPixelType: "U8",
        // raster: stretchFunction,
      });

      layer.rasterFunction = colormap;

      view.goTo(layer.fullExtent);
    });

    map.add(layer);
  }
};
