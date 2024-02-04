import axios from "axios";

/**
 * 查询所有的 fields
 */
export default () => {
  return axios
    .get("https://portal.beidouhj.com/server/rest/services/Geological_Hazards/MapServer/1", {
      params: {
        where: "1=1",
        returnGeometry: false,
        spatialRel: "esriSpatialRelIntersects",
        outFields: "*",
        f: "pjson",
      },
    })
    .then((res) => {
      const { fields } = res.data;

      const excludeFields = ["objectid", "st_area(shape)", "st_length(shape)", "bz", "shape", "jobid"];
      const tplFields = fields?.filter((e) => !excludeFields.includes(e.name));
      const fieldInfos = tplFields?.map((e) => {
        if (e.name == "zxjd" || e.name == "zxwd") {
          return {
            fieldName: e.name,
            label: e.alias,
            format: {
              digitSeparator: true,
              places: 4,
            },
          };
        } else {
          const obj = {
            fieldName: e.name,
            label: e.alias,
            type: e.type,
          };

          if (e.type === "esriFieldTypeDouble") {
            Reflect.set(obj, "format", {
              places: 6,
              digitSeparator: true,
            });
          }
          return obj;
        }
      });

      console.log("query fields:", fieldInfos);
      return fieldInfos;
    });
};
