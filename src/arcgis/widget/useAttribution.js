import Attribution from "@arcgis/core/widgets/Attribution";
import useMap from "@/arcgis/map/useMap";

export default function useAttribution() {
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
}
