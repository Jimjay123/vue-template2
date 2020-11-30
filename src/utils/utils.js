// 全局获取 公参方法
import store from '../store';
/**
 *
 * js复制内容方法
 *
 * 如果 id为false 直接复制attr
 *
 * 复制id为‘id’ 的元素的 attr属性
 *
 * 复制成功返回 true  失败 返回false
 *
 * */
export const copy = (id, attr) => {
  let target = null;
  if (attr) {
    target = document.createElement('div');
    target.id = 'tempTarget';
    target.style.opacity = '0';
    if (id) {
      const curNode = document.querySelector('#' + id);
      target.innerText = curNode[attr];
    } else {
      target.innerText = attr;
    }
    document.body.appendChild(target);
  } else {
    target = document.querySelector('#' + id);
  }

  let type = false;
  try {
    const range = document.createRange();
    range.selectNode(target);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    type = true;
  } catch (e) {
    type = false;
  }

  if (attr) {
    // remove temp target
    target.parentElement.removeChild(target);
  }
  return type;
};

// 获取缓存 token 方法
export const common = function () {
  if (sessionStorage.getItem('token')) {
    return sessionStorage.getItem('token');
  }
  return false;
};

// 设置ajax 状态方法
export const setAjax = val => {
  store.dispatch('loadingHandle', {
    loading: val
  });
};

// 数组克隆--对象序列化 注释：如果有函数则不能正常复制
export const cloneObj = obj => {
  return JSON.parse(JSON.stringify(obj));
};

// 设置tips 失败弹框
export const tipsFail = content => {
  store.dispatch('loadingHandle', {
    show: true,
    type: 'fail',
    content: content,
    time: 3000
  });
};

// 设置tips 提示信息
export const message = content => {
  store.dispatch('loadingHandle', {
    show: true,
    type: 'message',
    content: content,
    hasMask: false,
    time: 4500
  });
};

// 设置tips 警告弹框
export const tipsMsg = content => {
  store.dispatch('loadingHandle', {
    show: true,
    type: 'warning',
    content: content,
    hasMask: false,
    time: 4500
  });
};

// 设置tips 撤回弹框
export const tipsWithdraw = content => {
  store.dispatch('loadingHandle', {
    show: true,
    type: 'withdraw',
    content: content,
    hasMask: false,
    time: 4500
  });
};
