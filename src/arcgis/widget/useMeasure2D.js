import { loadModules } from "esri-loader";
import useMap from "@/arcgis/map/useMap";

let events = [];
let createWidget = (view, DistanceMeasurement2D) => {
  // CREATE：修改已有的线段，会触发viewModel.state，再次createWidget；使用该变量，使其不再触发
  let CREATE = true;
  const measurementWidget = new DistanceMeasurement2D({ view });
  // view.ui.add(measurementWidget, "top-right");
  events.push(measurementWidget);
  measurementWidget.viewModel.start();
  measurementWidget.watch("viewModel.measurement", function(measurement) {
    // 获取measurement信息
  });
  measurementWidget.watch("viewModel.state", function(state) {
    if (state === "measured" && CREATE) {
      CREATE = false;
      createWidget(view, DistanceMeasurement2D);
    }
  });
};

export default function useMeasure2D() {
  loadModules(["esri/widgets/DistanceMeasurement2D"]).then(
    ([DistanceMeasurement2D]) => {
      const { view } = useMap();
      createWidget(view, DistanceMeasurement2D);
    }
  );
}
export function unUseMeasure2D() {
  let widget = events[events.length - 1];
  if (widget?.active) widget.viewModel.clear();
}
export function clearMeasure2D() {
  events.reduceRight((_, widget) => {
    widget.viewModel.clear();
  }, []);
  events = [];
}
