import { loadModules } from "esri-loader";
import useMap from "@/arcgis/map/useMap";

export default () => {
  loadModules(["esri/widgets/Locate", "esri/Graphic"]).then(
    ([Locate, Graphic]) => {
      const { view } = useMap();
      const locate = view.ui.find("locate");
      if (locate) {
        view.ui.remove("locate");
      } else {
        view.ui.add(
          new Locate({
            view,
            id: "locate",
            label: "定位。。。",
            graphic: new Graphic({
              symbol: { type: "simple-marker" },
            }),
          }),
          "top-left"
        );
      }
    }
  );
};
