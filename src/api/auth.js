import request from "./axiosClient";

export function login(data) {
  return request({
    url: "/auth/user/login",
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
    data,
  });
}

export function resetPassword(data) {
  return request({
    url: "/auth/reset-password",
    method: "post",
    data,
  });
}

export function changePassword(data) {
  return request({
    url: "/auth/change-password",
    method: "post",
    data,
  });
}

export function sendMailReset(data) {
  return request({
    url: "/auth/send-mail-reset",
    method: "post",
    data,
  });
}
