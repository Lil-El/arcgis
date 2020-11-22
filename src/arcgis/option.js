import useCompass from "./widget/useCompass";
import useZoom from "./widget/useZoom";
import useAttribution from "./widget/useAttribution";
import useLocate from "./widget/useLocate";
import useMeasure2D, {
  unUseMeasure2D,
  clearMeasure2D,
} from "./widget/useMeasure2D";
import useMeasureArea2D, {
  unUseMeasureArea2D,
  clearMeasureArea2D,
} from "./widget/useMeasureArea2D";

const option = {
  widget: {
    zoom: {
      type: "checkbox",
      label: "Zoom",
      checked: true,
      use: useZoom,
    },
    compass: {
      type: "checkbox",
      label: "Compass",
      checked: false,
      use: useCompass,
    },
    attribution: {
      type: "checkbox",
      label: "Attribution",
      checked: true,
      use: useAttribution,
    },
    locate: {
      type: "checkbox",
      label: "Locate",
      checked: false,
      use: useLocate,
    },
    "measure Length": {
      type: "button",
      label: "Measure Length",
      checked: false,
      use: useMeasure2D,
      unActive: unUseMeasure2D,
      clear: clearMeasure2D,
    },
    "measure Area": {
      type: "button",
      label: "Measure Area",
      checked: false,
      use: useMeasureArea2D,
      unActive: unUseMeasureArea2D,
      clear: clearMeasureArea2D,
    },
  },
};

export default option;
