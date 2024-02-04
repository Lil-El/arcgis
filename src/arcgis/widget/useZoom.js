import Zoom from "@arcgis/core/widgets/Zoom";
import useMap from "@/arcgis/map/useMap";

export default function useZoom() {
  const { view } = useMap();
  const zoom = view.ui.find("zoom");
  if (zoom) {
    view.ui.remove("zoom");
  } else {
    view.ui.add(new Zoom({ view, id: "zoom" }), "top-left");
  }
}
