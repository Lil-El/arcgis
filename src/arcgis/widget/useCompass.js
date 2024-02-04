import Compass from "@arcgis/core/widgets/Compass";
import useMap from "@/arcgis/map/useMap";

export default () => {
  const { view } = useMap();
  const compass = view.ui.find("compass");
  if (compass) {
    view.ui.remove("compass");
  } else {
    view.ui.add(new Compass({ view, id: "compass" }), "top-left");
  }
};
