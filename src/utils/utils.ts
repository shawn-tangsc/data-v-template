import { RouteObject } from "@/routes/interface";
import Cookies from 'js-cookie'

export function getPolylineLength(points: Array<any>) {
  // let lineSegments = new Array(points.length-1).fill(0).map(function)

}

/**
 * 转换成防抖函数
 * @param fn 需要转换的函数
 * @param delay 延迟时间（ms）
 * @param runFirstFn 是否执行第一次
 * @returns 
 */
export function debounce(fn: Function, delay: number = 600, runFirstFn: boolean = true) {
  let timer: any = null
  return function (...rest: any) {
    clearTimeout(timer);
    if (runFirstFn) {
      fn.apply(this, rest)
      runFirstFn = false
      return
    }
    timer = setTimeout(fn.bind(this, ...rest), delay)
  }
}

/**
 * 监听dom元素变化的函数，当指定的 DOM 元素的样式发生变化时，会触发传入的回调函数
 * @param dom 需要监听的dom元素
 * @param callback 需要执行的回调函数
 * @returns 返回这个监听函数
 */
export function observerDomResize(dom: any, callback: any) {
  // MutationObserver API
  const MutationObserver = window.MutationObserver
  const observer = new MutationObserver(callback);
  observer.observe(dom, {
    attributes: true,
    attributeFilter: ['style'],
    attributeOldValue: true
  })

  return observer
}


/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @return string
 */
export const localGet = (key: string) => {
  const value = window.localStorage.getItem(key);
  try {
    return JSON.parse(window.localStorage.getItem(key) as string);
  } catch (error) {
    return value;
  }
};

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {Any} value Storage值
 * @return void
 */
export const localSet = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @return void
 */
export const localRemove = (key: string) => {
  window.localStorage.removeItem(key);
};

/**
 * @description 清除所有localStorage
 * @return void
 */
export const localClear = () => {
  window.localStorage.clear();
};

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export const getBrowserLang = () => {
  let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
  let defaultBrowserLang = "";
  if (browserLang.toLowerCase() === "cn" || browserLang.toLowerCase() === "zh" || browserLang.toLowerCase() === "zh-cn") {
    defaultBrowserLang = "zh";
  } else {
    defaultBrowserLang = "en";
  }
  return defaultBrowserLang;
};


/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (path: string, routes: RouteObject[] = []): RouteObject => {
  let result: RouteObject = {};
  for (let item of routes) {
    if (item.path === path) return item;
    if (item.children) {
      const res = searchRoute(path, item.children);
      if (Object.keys(res).length) result = res;
    }
  }
  return result;
};


/**
 * @description 使用递归处理路由菜单，生成一维数组，做菜单权限判断
 * @param {Array} menuList 所有菜单列表
 * @param {Array} newArr 菜单的一维数组
 * @return array
 */
export function handleRouter(routerList: Menu.MenuOptions[], newArr: string[] = []) {
  routerList.forEach((item: Menu.MenuOptions) => {
    typeof item === "object" && item.path && newArr.push(item.path);
    item.children && item.children.length && handleRouter(item.children, newArr);
  });
  return newArr;
}

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
export const isType = (val: any) => {
  if (val === null) return "null";
  if (typeof val !== "object") return typeof val;
  else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
};

/**
 * @description 对象数组深克隆
 * @param {Object} obj 源对象
 * @return object
 */
export const deepCopy = <T>(obj: any): T => {
  let newObj: any;
  try {
    newObj = obj.push ? [] : {};
  } catch (error) {
    newObj = {};
  }
  for (let attr in obj) {
    if (typeof obj[attr] === "object") {
      newObj[attr] = deepCopy(obj[attr]);
    } else {
      newObj[attr] = obj[attr];
    }
  }
  return newObj;
};

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return number
 */
export function randomNum(min: number, max: number): number {
  let num = Math.floor(Math.random() * (min - max) + max);
  return num;
}
const TokenKey = 'DATAV_TOKEN';
const tokenCookieExpires = 1;// token过期时间
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string, remeberMe: boolean) {
  if (remeberMe) {
    return Cookies.set(TokenKey, token, { expires: tokenCookieExpires })
  }
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}