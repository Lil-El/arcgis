/**
 * 镶嵌数据集
 */

import ImageryLayer from "@arcgis/core/layers/ImageryLayer";
import * as rasterFunctionUtils from "@arcgis/core/layers/support/rasterFunctionUtils";
import RasterStretchRenderer from "@arcgis/core/renderers/RasterStretchRenderer";
import RasterFunction from "@arcgis/core/layers/support/RasterFunction";
import useMap from "../map/useMap";

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
      /**
       * 使用 RasterFunction 方式渲染
       * 通过 ArcGIS 服务内置的光栅函数
       * 对于例子中的影像切片服务，使用内置的Elevation是正常的
       * 但是对于北斗的影像服务，使用内置的Elevation总是有问题：不设置Stretch无法设置颜色，但是设置了Stretch图例的数值总是不对
       */
      const stretchFunction = new RasterFunction({
        functionName: "Stretch",
        functionArguments: {
          StretchType: 6, // (0=None, 3=StandardDeviation, 4=Histogram Equalization, 5=MinMax, 6=PercentClip, 9=Sigmoid)
          MinPercent: 0.25, // 0.25 25
          MaxPercent: 0.25,
          DRA: !false, // 允许仅基于显示范围内的像元调整亮度和对比度
          Min: 0,
          Max: 255,
          Raster: "$$",
        },
        outputPixelType: "U8",
        variableName: "Raster",
      });

      const colorFunction = new RasterFunction({
        functionName: "Colormap",
        functionArguments: {
          ColorrampName: "Elevation #1",
          Raster: stretchFunction,
        },
        outputPixelType: "U8",
        variableName: "Raster",
      });

      layer.rasterFunction = colorFunction;

      view.goTo(layer.fullExtent);
    });

    map.add(layer);
  }
};
