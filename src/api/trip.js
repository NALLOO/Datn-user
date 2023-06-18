import request from "./axiosClient";

export function getTrip(params) {
  return request({
    url: "/trip/get",
    method: "get",
    params,
  });
}

export function getDetail(id) {
  return request({
    url: `/trip/detail/${id}`,
    method: "get",
  });
}
