import ImageryLayer from "@arcgis/core/layers/ImageryLayer";
import ImageryTileLayer from "@arcgis/core/layers/ImageryTileLayer";
import * as rasterFunctionUtils from "@arcgis/core/layers/support/rasterFunctionUtils";
import RasterStretchRenderer from "@arcgis/core/renderers/RasterStretchRenderer";
import RasterFunction from "@arcgis/core/layers/support/RasterFunction";
import ImageHistogramParameters from "@arcgis/core/rest/support/ImageHistogramParameters";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import { debounce } from "@arcgis/core/core/promiseUtils";
import Legend from "@arcgis/core/widgets/Legend";
import useMap from "../map/useMap";

export default () => {
  const { map, view } = useMap();

  if (map.findLayerById("IMAGERY_LAYER2")) {
    map.remove(map.findLayerById("IMAGERY_LAYER2"));
  } else {
    const layer = new ImageryLayer({
      id: "IMAGERY_LAYER2",
      // 正式环境
      //url: "https://portal.beidouhj.com/server/rest/services/DEM/ImageServer",
      // 单个-曹家滩
      url: "https://cportal.beidouhj.com/server/rest/services/DEM_test/caojt_DEM_test_tif/ImageServer",
      // 美国
      //url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/OsoLandslide/OsoLandslide_After_3DTerrain/ImageServer"

      // 曹家滩
      //definitionExpression: "dcpc like '2023年7月18日至2023年8月29日%' AND ksbm = 'C6100002017111110145309'"
      // 桑树坪
      //definitionExpression: "dcpc like '2022年12月12日至2022年12月12日%' AND ksbm = 'C1000002008091120000816'"
    });

    layer.when(async () => {
      let renderer = new RasterStretchRenderer();
      renderer.colorRamp = {
        type: "multipart",
        colorRamps: [
          {
            fromColor: [175, 240, 233, 1],
            toColor: [255, 255, 179, 1],
            algorithm: "esriCIELabAlgorithm", // esriHSVAlgorithm | esriCIELabAlgorithm
          },
          {
            fromColor: [255, 255, 179, 1],
            toColor: [0, 128, 64, 1],
            algorithm: "esriCIELabAlgorithm", // esriHSVAlgorithm | esriCIELabAlgorithm
          },
          {
            fromColor: [0, 128, 64, 1],
            toColor: [247, 200, 35, 1],
            algorithm: "esriCIELabAlgorithm", // esriHSVAlgorithm | esriCIELabAlgorithm
          },
          {
            fromColor: [247, 200, 35, 1],
            toColor: [128, 0, 0, 1],
            algorithm: "esriCIELabAlgorithm", // esriHSVAlgorithm | esriCIELabAlgorithm
          },
          {
            fromColor: [128, 0, 0, 1],
            toColor: [122, 63, 18, 1],
            algorithm: "esriCIELabAlgorithm", // esriHSVAlgorithm | esriCIELabAlgorithm
          },
        ],
      };
      renderer.stretchType = "min-max";

      view.watch(
        "extent",
        debounce(function (newValue, oldValue, propertyName, target) {
          let pixelSize = {
            x: view.resolution,
            y: view.resolution,
            spatialReference: {
              wkid: view.spatialReference.wkid,
            },
          };
          let params = new ImageHistogramParameters({
            geometry: view.extent,
            pixelSize: pixelSize,
          });
          layer.computeStatisticsHistograms(params).then(function (results) {
            let bandStat = results.statistics[0];
            renderer.statistics = [
              {
                min: bandStat.min,
                max: bandStat.max,
                avg: bandStat.avg,
                stddev: bandStat.stddev,
              },
            ];
            layer.renderer = renderer;
          });
        })
      );
      let layerView = await view.whenLayerView(layer);
      let legend = null;
      reactiveUtils.when(
        () => !layerView.updating,
        () => {
          if (legend) {
            view.ui.remove(legend);
          }
          legend = new Legend({
            view: view,
          });
          view.ui.add(legend, "bottom-right");
        }
      );

      view.goTo(layer.fullExtent);
    });

    map.add(layer);
  }
};
