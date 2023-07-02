import NProgress from '@/config/nprogress';
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AxiosCanceler } from '@/utils/http/AxiosCancel';
import store from '@/store';
import { AppState, AppDispatch } from '@/store'
import { RequestEnum, ResponseEnum } from '@/utils/enums/httpEnum'
import { message } from "antd";
import { setUserToken } from '@/store/user/userSlice'

const axiosCanceler = new AxiosCanceler();
console.log("process.env")
console.log(process)
console.log(process.env)
console.log(process.env.REACT_API_URL)

const config = {
  // 请求地址，在.env 开头的文件中定义
  baseURL: process.env.REACT_API_URL,
  // 设置接口超时时间
  timeout: 10000,
  // 跨域时允许携带凭证
}

export interface Result {
  code: string;
  msg: string;
}

export interface ResultData<T = any> extends Result {
  data?: T;
}


class RequestHttp {
  service: AxiosInstance;

  public constructor(config: AxiosRequestConfig) {
    console.log('constructor')
    this.service = axios.create(config);
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        console.log('http request ')
        NProgress.start();
        axiosCanceler.addPending(config)
        // // todo loading
        // // config.headers!.noLoading ||
        // // const dispatch = useDispatch<AppDispatch>()
        // 这里不能用useSelector 和useDispatch 记住了，这样是拿不到的
        //const state = useSelector<AppState, AppState['user']>((state) => state.user)

        const token: string = store.getState().user.token
        return { ...config, headers: { ...config.headers, 'X-Access-Token': token } }
      }, (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    this.service.interceptors.response.use((response: AxiosResponse) => {
      const { data, config } = response;
      NProgress.done();
      axiosCanceler.removePending(config);
      if (data.code == ResponseEnum.UNAUTHORIZED) {
        // const dispatch = useDispatch<AppDispatch>()
        // // 清空token
        // dispatch(setUserToken({ token: '' }))
        store.dispatch(setUserToken({ token: '' }));
        message.error(data.msg);
        window.location.hash = "/login";
        return Promise.reject(data);
      }
      if (data.code && data.code !== ResponseEnum.SUCCESS) {
        message.error(data.msg);
        return Promise.reject(data);
      }
      return data;
    }, (error: AxiosError) => {
      const { response } = error

    })
  }

  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { ...params, ..._object })
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, { ...params, ..._object })
  }
}

export default new RequestHttp(config)
