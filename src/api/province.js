import request from "./axiosClient";

export function getListProvince() {
  return request({
    url: "/province",
    method: "get",
  });
}
