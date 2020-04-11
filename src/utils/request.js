import axios from "axios";

axios.defaults.withCredentials = true;

class HttpRequest {
  constructor(baseUrl = "/") {
    this.baseUrl = baseUrl;
    this.queue = {};
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      withCredentials: true,
      headers: {
        //
      }
    };
    return config;
  }
  destroy(url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // ViewUI.LoadingBar.finish();
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        this.queue[url] = true;
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        this.destroy(url);
        const { data, status } = res;
        const error = { status, data };
        if (status >= 500) {
          return Promise.reject(error);
        } else if (status >= 400) {
          return Promise.reject(error);
        }
        return data;
      },
      error => {
        this.destroy(url);
        return Promise.reject(error);
      }
    );
  }

  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}

let httpRequest = new HttpRequest();
const request = (url, params) => {
  return httpRequest.request({ url, ...params });
};
export default request;
