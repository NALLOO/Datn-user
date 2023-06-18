import request from "./axiosClient";

export function getProfile() {
  return request({
    url: "user/me",
    method: "get",
  });
}

export function updateProfile(data) {
  return request({
    url: "user/update",
    method: "put",
    data,
  });
}
