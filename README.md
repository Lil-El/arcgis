# ArcGIS

## Project Run

```
npm install
npm run serve
```

See [Vue Composition API](https://composition-api.vuejs.org/zh/)

See [ArcGIS API for JavaScript 4.x](https://developers.arcgis.com/javascript/latest/api-reference/index.html)

## ArcGIS Version

- ❎ `esri-loader` (deprected)
- ✅ `@arcgis/core`

  1. copy `node_modules/@arcgis/core/assets` to `public`
  2. set assets config path

     ```js
     import esriConfig from "@arcgis/core/config";
     esriConfig.assetsPath = "./assets";
     ```

  3. import `@arcgis/core/assets/esri/themes/light/main.css`

## ArcGIS API Reference

### Widgets

- Zoom
- Compass

### Layers

- FeatureLayer
- ImageryLayer
- TileLayer
