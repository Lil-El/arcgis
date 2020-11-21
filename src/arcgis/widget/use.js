import useZoom from "./useZoom";
import useCompass from "./useCompass";

const mapping = {
  zoom: useZoom,
  compass: useCompass,
};
export const widgetFn = {
  use(widget) {
    mapping[widget]();
  },
};
