import { loadModules } from "esri-loader";
import useMap from "@/arcgis/map/useMap";

let events = [];
let createWidget = (view, AreaMeasurement2D) => {
  // CREATE：修改已有的线段，会触发viewModel.state，再次createWidget；使用该变量，使其不再触发
  let CREATE = true;
  const measurementWidget = new AreaMeasurement2D({ view });
  // view.ui.add(measurementWidget, "top-right");
  events.push(measurementWidget);
  measurementWidget.viewModel.start();
  measurementWidget.watch("viewModel.measurement", function(measurement) {
    // 获取measurement信息和geometry
  });
  measurementWidget.watch("viewModel.state", function(state) {
    if (state === "measured" && CREATE) {
      CREATE = false;
      createWidget(view, AreaMeasurement2D);
    }
  });
};

export default function useMeasureArea2D() {
  loadModules(["esri/widgets/AreaMeasurement2D"]).then(
    ([AreaMeasurement2D]) => {
      const { view } = useMap();
      createWidget(view, AreaMeasurement2D);
    }
  );
}
export function unUseMeasureArea2D() {
  let widget = events[events.length - 1];
  // 判断active为true时清除；否则在使用全局unActive时，会将最后一个绘制的measurement删除
  if (widget?.active) widget.viewModel.clear();
}
export function clearMeasureArea2D() {
  events.reduceRight((_, widget) => {
    widget.viewModel.clear();
  }, []);
  events = [];
}
