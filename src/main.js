import { createApp } from "vue";
import esriConfig from "@arcgis/core/config";
esriConfig.assetsPath = "./assets";

import App from "./App.vue";
import "./styles/index.scss";
import "@arcgis/core/assets/esri/themes/light/main.css";

createApp(App).mount("#app");
