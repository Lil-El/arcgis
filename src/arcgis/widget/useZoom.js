import { loadModules } from "esri-loader";

export default function useZoom(view) {
  loadModules(["esri/widgets/Zoom"]).then(([Zoom]) => {
    const zoom = new Zoom({ view });
    view.ui.add(zoom, "top-left");
  });
}
