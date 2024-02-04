import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import useMap from "../map/useMap";
import useFields from "../server/useFields";

/**
 * 查询服务所有的信息，获取 fields 转换为 fieldInfos
 * url: xxx/MapServer/[layerID]
 */

export default async () => {
  const { map, view } = useMap();

  if (map.findLayerById("MAP_IMAGE_LAYER")) {
    map.remove(map.findLayerById("MAP_IMAGE_LAYER"));
  } else {
    const fieldInfos = await useFields();
    
    const layer = new MapImageLayer({
      id: "MAP_IMAGE_LAYER",
      url: "https://portal.beidouhj.com/server/rest/services/Geological_Hazards/MapServer",
      sublayers: [
        {
          id: 1,
          definitionExpression: `dcpc like '2023年7月18日至2023年8月29日%' AND ksbm = 'C6100002017111110145309'`,
          popupTemplate: {
            title: `Detail!`,
            content: [
              {
                type: "fields",
                // fieldInfos: [
                //   {
                //     fieldName: "ysdm",
                //     label: "要素代码",
                //     type: "esriFieldTypeString",
                //   },
                //   {
                //     fieldName: "xzqbm",
                //     label: "行政区编码",
                //     type: "esriFieldTypeString",
                //   },
                //   {
                //     fieldName: "sjqy",
                //     label: "三级企业",
                //     type: "esriFieldTypeString",
                //   },
                // ],
                fieldInfos
              },
            ],
          },
        },
      ],
    });

    layer.when(() => {
      view.goTo(layer.fullExtent);
    });

    map.add(layer);
  }
};
