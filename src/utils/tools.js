import axios from 'axios';
import { common, setAjax, tipsFail } from './utils'; // 引入url选择
// 添加请求拦截器， 在发送请求前 做些什么 例如添加接口公参，
axios.interceptors.request.use(
  cfg => {
    // 显示加载中状态
    setAjax(true);
    cfg.href = location.href;
    cfg.headers.common.Authorization = common() || '';
    cfg.headers['Content-Type'] = 'application/json'; // 设置跨域头部,虽然很多浏览器默认都是使用json传数据，但咱要考虑IE浏览器。
    // cfg.headers.Referer = 'http://weixin.qq.com/'; // 设置跨域头部,虽然很多浏览器默认都是使用json传数据，但咱要考虑IE浏览器。
    return cfg;
  },
  err => {
    // 错误执行方法
    // 添加网络异常提示框
    setAjax(false);
    tipsFail('网络异常，刷新页面试试呢');
    return Promise.reject(err);
  }
);

// 添加接口响应拦截器
axios.interceptors.response.use(
  res => {
    // console.log(res)
    // 隐藏加载中状态
    setAjax(false);
    // if (res.data.code == '401') {
    //   // 未登录重定向到首页
    //   if (res.config.href === window.location.href) {
    //     sessionStorage.setItem('callBackUrl', res.config.href);
    //   }
    //   window.location.href = urlHtml.url + 'main/login';
    // }
    return res.data;
  },
  err => {
    // 错误处理
    // 添加网络异常提示框
    setAjax(false);
    const code = err.message.code;
    if (
      code != 200 ||
      code != 201 ||
      code != 202 ||
      code != 203 ||
      code != 203 ||
      code != 205 ||
      code != 206 ||
      code != 207 ||
      code != 300 ||
      code != 301 ||
      code != 302 ||
      code != 303 ||
      code != 304 ||
      code != 305 ||
      code != 306 ||
      code != 307
    ) {
      // 表示主动取消接口 不触发公共 异常提示信息 会触发调用接口时的 catch方法
      tipsFail('网络异常，刷新页面试试呢');
    }
    return Promise.reject(err);
  }
);
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = false;
// axios.defaults.timeout = 2000;

// 普通接口  注释：提交文件类不可用或要修改
export const tools = {
  async ajax (cfg) {
    cfg.url = process.env.VUE_APP_API_BASE_URL + cfg.url;
    if (cfg.method === 'get') {
      cfg.params = {
        ...cfg.data
      };
    }

    const res = await axios(cfg);
    return res;
  }
};
