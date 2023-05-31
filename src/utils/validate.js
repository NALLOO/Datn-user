/* eslint-disable */

export function isEmptyOrNull(value) {
  if (value && typeof value === "string") {
    value = value.trim();
  }
  return (
    value === null ||
    value === "" ||
    typeof value === "undefined" ||
    value.length === 0
  );
}
export function validateRequired(rule, value, callback, isCallback = true) {
  if (isEmptyOrNull(value)) {
    callback(new Error(rule.attr + " là bắt buộc!"));
  }
  if (isCallback) callback();
}

export function validateEmail(rule, value, callback, isCallback = true) {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!reg.test(value)) {
    callback(new Error(rule.attr + " cần đúng định dạng!"));
  }
  if (isCallback) callback();
}

export function validateSize(rule, value, callback, isCallback = true) {
  if (
    rule.condition &&
    rule.condition.min &&
    (value + "").length > 0 &&
    rule.condition.min &&
    (value + "").length < rule.condition.min
  ) {
    callback(
      new Error(rule.attr + ` phải nhiều hơn ${rule.condition.min} ký tự`)
    );
  }
  if (
    rule.condition &&
    rule.condition.max &&
    (value + "").length > rule.condition.max
  ) {
    callback(new Error(rule.attr + ` tối đa ${rule.condition.min} ký tự`));
  }
  if (rule.condition && rule.condition.between) {
    const min = rule.condition.between[0];
    const max = rule.condition.between[1];
    callback(
      new Error(rule.attr + ` phải nhiều hơn ${min} và ít hơn ${max} ký tự `)
    );
  }
  if (isCallback) callback();
}

export function validateConfirmed(rule, value, callback, isCallback = true) {
  if (value && rule.condition && value !== rule.condition.confirmed) {
    callback(new Error("Phải nhập trùng với mật khẩu!"));
  }
  if (isCallback) callback();
}

export function validatePhoneNumber(rule, value, callback, isCallback = true) {
  const reg = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
  if (!reg.test(value)) {
    callback(new Error(rule.attr + " phải đúng định dạng!"));
  }
  if (isCallback) callback();
}
