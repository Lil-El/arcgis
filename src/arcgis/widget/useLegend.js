import Legend from "@arcgis/core/widgets/Legend";
import useMap from "../map/useMap";

export default () => {
  const { view } = useMap();

  // 自动根据图层从服务中加载 legend
  if (view.ui.find("legend")) {
    view.ui.remove(view.ui.find("legend"));
  } else {
    view.ui.add(new Legend({ id: "legend", view }), "bottom-right");
  }
};
