import request from "./axiosClient";

export function login(data) {
  return request({
    url: "/auth/login",
    method: "post",
    data,
  });
}

export function register(data) {
  return request({
    url: "/auth/register",
    method: "post",
    data,
  });
}

export function checkToken(data) {
  return request({
    url: "/auth/check-token",
    method: "post",
    data
  })
}

export function resetPassword(data) {
  return request({
    url: "/auth/reset-password",
    method: "post",
    data
  })
}
