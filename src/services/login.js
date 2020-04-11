import request from "@/utils/request";

export class LoginParamsType {
  constructor(name, password, mobile, captcha) {
    this.userName = name;
    this.password = password;
    this.mobile = mobile;
    this.captcha = captcha;
  }
}

export async function fakeAccountLogin(params) {
  return request("/api/login/account", {
    method: "POST",
    data: params
  });
}

export const getFakeCaptcha = mobile => {
  return request(`/api/login/captcha?mobile=${mobile}`);
};
