import { loadModules } from "esri-loader";
import useMap from "@/arcgis/map/useMap";

export default function useAttribution() {
  loadModules(["esri/widgets/Attribution"]).then(([Attribution]) => {
    const { view } = useMap();
    const attribution = view.ui.find("attribution");
    if (attribution) {
      view.ui.remove("attribution");
    } else {
      view.ui.add(
        new Attribution({
          view,
          id: "attribution",
        })
      );
    }
  });
}
