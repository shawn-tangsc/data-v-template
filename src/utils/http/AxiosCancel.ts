import axios, {AxiosRequestConfig, Canceler} from "axios";
import {isFunction} from "@/utils/is";
import qs from 'qs'

// 声明一个Map 用于存储每个请求的表示标识和取消请求函数
let pendingMap = new Map<string,Canceler>();

export const getPendingUrl = (config:AxiosRequestConfig)=>[config.method,config.url,qs.stringify(config.data),qs.stringify(config.params)].join("&")

export class AxiosCanceler{
  /**
   * 添加请求
   * @param config
   */
  addPending(config:AxiosRequestConfig){
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken = config.cancelToken || new axios.CancelToken(cancel=>{
      if(!pendingMap.has(url)){
        pendingMap.set(url,cancel);
      }
    })
  }
  /**
   * @description: 移除请求
   * @param {Object} config
   */
  removePending(config:AxiosRequestConfig){
    const url = getPendingUrl(config);
    if(pendingMap.has(url)){
      const cancel = pendingMap.get(url);
      cancel && cancel();
      pendingMap.delete(url);

    }
  }
  /**
   * @description: 清空所有pending
   */
  removeAllPending() {
    pendingMap.forEach(cancel => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }

  /**
   * @description: 重置
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}
