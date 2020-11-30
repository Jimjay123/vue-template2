import { tools } from '@/utils/tools';
import url from './url';

// 获取token
export const getToken = data => {
  // 接口公参添加
  const cfg = {
    method: 'post',
    url: url.getToken,
    data
  };
  return tools.ajax(cfg);
};
