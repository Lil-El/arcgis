import { loadModules } from "esri-loader";
import useMap from "@/arcgis/widgets/useMap";
export default () => {
  loadModules(["esri/Compass"]).then(([Compass]) => {
    let { view } = useMap();
    let compass = new Compass({ view, id: "compass" });
    view.ui.add(compass, "top-left");
  });
  return compass;
};
