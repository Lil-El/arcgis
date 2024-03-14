import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Graphic from "@arcgis/core/Graphic";
import useMap from "../map/useMap";
import LabelClass from "@arcgis/core/layers/support/LabelClass";

/**
 * Tips:
 * 1. Create featurelayer from feature service（使用 URL 调用服务）
 * 2. Create featurelayer from client-side graphics（使用 source，展示客户端 graphics）
 */
export default () => {
  const { map } = useMap();

  if (map.findLayerById("FEATURE_LAYER")) {
    map.remove(map.findLayerById("FEATURE_LAYER"));
  } else {
    const statesLabelClass = new LabelClass({
      labelExpressionInfo: { expression: "$feature.name" },
      symbol: {
        type: "text",
        color: "red",
        haloSize: 1,
        haloColor: "white",
      },
    });

    const layer = new FeatureLayer({
      id: "FEATURE_LAYER",
      labelingInfo: [statesLabelClass],
      objectIdField: "ObjectID",
      outFields: ["*"], // 查询的字段
      // 配置的字段，和 graphic 的 attributes 相关联; 供 labelClass 使用
      fields: [
        { name: "objectId", type: "oid" },
        { name: "name", type: "string" },
      ],
      geometryType: "point",
      source: [
        new Graphic({
          geometry: {
            type: "point", // autocasts as new Point()
            longitude: 108.90039062499926,
            latitude: 34.27219171167824,
          },
          attributes: {
            name: "Mino",
            date: "2021/2/4",
            url: "https://xxx.png",
          },
          // 不生效
          // symbol: {
          //   type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          //   color: [0, 255, 0],
          // },
        }),
      ],
      // 所有的 graphic 设置同一个图标
      /* renderer: {
        type: "simple",
        symbol: {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          color: [255, 0, 0],
        },
      }, */
      // 所有的 graphic 设置不同的图标，只根据 name 进行设置
      /* renderer: {
        type: "unique-value",
        field: "name", // value 引用的属性
        uniqueValueInfos: [
          {
            value: "Mino",
            symbol: {
              type: "picture-marker",
              url: "https://xxx.png",
              width: "20px",
              height: "20px",
            },
          }
          // ...对应更多 graphic
        ],
      }, */
      // 所有的 graphic 设置不同的图标，只根据 name 和 date 进行设置
      renderer: {
        type: "unique-value",
        field: "name", // value 引用的属性
        field2: "date",
        fieldDelimiter: ", ",
        uniqueValueInfos: [
          {
            value: "Mino, 2021/2/4",
            symbol: {
              type: "picture-marker",
              url: "https://xxx.png",
              width: "20px",
              height: "20px",
            },
          }
          // ...对应更多 graphic
        ],
      },
      popupTemplate: {
        title: "This's Title!",
        outFields: ["*"],
        content: (graphic) => {
          /**
           * graphic 的 attributes 只能获取到 ObjectID 和 name
           * date 没有配置在 fields 中，所以获取不到
           */
          return graphic.attributes.name;
        },
      },
      // definitionExpression // SQL query
      // clustering: true, // 聚合开启？
    });

    map.add(layer);
  }
};
