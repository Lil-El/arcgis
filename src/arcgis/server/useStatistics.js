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
 * 数据统计
 */
export const statistics = () => {
  /**
   * URL encode 将 空格转换成了 +，而不是 %20,
   * 所以导致请求报 400,
   * 在拦截器中进行处理
   */
  axios.interceptors.request.use((config) => {
    let url = config.url;
    if (config.method === "get" && config.params) {
      url += "?"; // 拼接参数
      // 获取所有参数，通过循环 拼接所有参数，encodeURIComponent对参数编码，
      Object.keys(config.params).map((key) => {
        url += `${key}=${encodeURIComponent(config.params[key])}&`;
      });
      url = url.substring(0, url.length - 1); // 删除最后一个&字符
      config.params = {}; // 参数已经存在于 url中
    }
    config.url = url;
    return config;
  });
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
