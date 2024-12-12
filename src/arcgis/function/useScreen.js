import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import useMap from "../map/useMap";

export default () => {
  // 创建地图容器
  const dom = document.createElement("div");
  dom.id = "map2";
  dom.style.flex = "1";
  document.querySelector(".container").append(dom);

  const { view } = useMap();

  const view2 = new MapView({
    container: "map2",
    map: new Map({
      basemap: "topo-vector",
    }),
    center: [106, 34.09042],
    zoom: 3,
  });

  view2.when(() => {
    console.log(view2);
    view2.extent = view.extent;

    view2.watch("extent", () => {
      if (
        view2.extent.width === view.extent.width &&
        view2.extent.height === view.extent.height &&
        view2.extent.xmin === view.extent.xmin &&
        view2.extent.ymin === view.extent.ymin
      )
        return;
      console.log("view2.extent");
      view.extent = view2.extent;
    });
    view.watch("extent", () => {
      if (
        view2.extent.width === view.extent.width &&
        view2.extent.height === view.extent.height &&
        view2.extent.xmin === view.extent.xmin &&
        view2.extent.ymin === view.extent.ymin
      )
        return;
      view2.extent = view.extent;
    });
  });
};
