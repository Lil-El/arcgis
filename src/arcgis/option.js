// import widgets
import useCompass from "./widget/useCompass";
import useZoom from "./widget/useZoom";
import useAttribution from "./widget/useAttribution";
import useLocate from "./widget/useLocate";
import useLegend from "./widget/useLegend";
import useMeasure2D, { unUseMeasure2D, clearMeasure2D } from "./widget/useMeasure2D";
import useMeasureArea2D, { unUseMeasureArea2D, clearMeasureArea2D } from "./widget/useMeasureArea2D";

// import layers
import useWebTile from "./layer/useWebTile";
import useTile from "./layer/useTile";
import useFeature from "./layer/useFeature";
import useImagery from "./layer/useImagery";
import useMapImage from "./layer/useMapImage";
import useFields from "./server/useFields";
import { query, statistics } from "./server/useStatistics";

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
    legend: {
      type: "checkbox",
      label: "Legend",
      checked: false,
      use: useLegend,
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
  layer: {
    webTile: {
      type: "checkbox",
      label: "WebTile",
      checked: false,
      use: useWebTile,
    },
    tile: {
      type: "checkbox",
      label: "Tile",
      checked: false,
      use: useTile,
    },
    feature: {
      type: "checkbox",
      label: "Feature",
      checked: false,
      use: useFeature,
    },
    imagery: {
      type: "checkbox",
      label: "Imagery",
      checked: false,
      use: useImagery,
    },
    mapImagery: {
      type: "checkbox",
      label: "MapImagery",
      checked: false,
      use: useMapImage,
    },
  },
  server: {
    queryField: {
      type: "button",
      label: "query field",
      use: useFields,
    },
    query: {
      type: "button",
      label: "query dcpc",
      use: query,
    },
    statistics: {
      type: "button",
      label: "statistics",
      use: statistics,
    },
  },
};

export default option;
