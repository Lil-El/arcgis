import { loadModules } from "esri-loader";
import useMap from "@/arcgis/map/useMap";

export default () => {
  loadModules(["esri/widgets/Compass"]).then(([Compass]) => {
    let { view } = useMap();
    let compass = new Compass({ view, id: "compass" });
    view.ui.add(compass, "top-left");
  });
};
