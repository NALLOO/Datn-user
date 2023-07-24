import request from "./axiosClient";

export function createPayment(data) {
  return request({
    url: "/stripe/create-session",
    method: "post",
    data,
  });
}
