import axios from "axios";

/**
 * params 的写法可以查看 portal 的内容
 *
 * 查询：调查批次
 */
export const query = () => {
  axios
    .get("https://portal.beidouhj.com/server/rest/services/Subsidence_t/ImageServer/query", {
      params: {
        where: "(1=1) AND (ksbm='C6100002017111110145309')",
        outFields: "*",
        orderByFields: "dcpc DESC",
        returnGeometry: false,
        f: "pjson",
      },
    })
    .then((res) => {
      console.log(res.data);
    });
};

/**
 * 代码没问题，不知道为啥报400，对比了下，好像是因为 url encode 没有将括号这些转义
 * 数据统计
 */
export const statistics = () => {
  axios
    .get(
      "https://portal.beidouhj.com/server/rest/services/2_榆北_曹家滩/C6100002017111110145309_VectorProduct/MapServer/3/query",
      {
        params: {
          where: `(1=1) AND (ksbm='C6100002017111110145309') AND (dcpc='2023年7月18日至2023年8月29日') AND (objectid is not null)`,
          groupByFieldsForStatistics: "tblx",
          outStatistics: JSON.stringify([
            {
              statisticType: "count", // 统计方式
              onStatisticField: "objectid", // 统计字段
              outStatisticFieldName: "funId", // 重命名
            },
          ]),
          f: "pjson",
        },
      }
    )
    .then((res) => {
      console.log(res.data);
    });
};
