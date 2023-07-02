import http from "@/utils/http/RequestHttp"

export namespace Login {
  export interface ReqLoginForm {
    username: string;
    password: string;
  }
  export interface ResLogin {
    access_token: string;
  }
}
export default Login;
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>('/hooks/login', params)
}