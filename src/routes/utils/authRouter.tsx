import {useLocation, Navigate} from "react-router-dom";
import {AxiosCanceler} from "@/utils/http/AxiosCancel";
import {searchRoute} from "@/utils/utils";
import {rootRouter} from "@/routes";
import store from "@/store";
import { setUserMenu } from "@/store/user/userSlice";
import menuList from "@/config/menuList";
const axiosCanceler = new AxiosCanceler();

/**
 * @description 路由守卫组件
 * */

const AuthRouter = (props: { children: JSX.Element }) => {
  const {pathname} = useLocation();
  const route = searchRoute(pathname, rootRouter);
  axiosCanceler.removeAllPending();
  // * 判断当前路由是否需要访问权限(不需要权限直接放行)
  if (!route.meta?.requiresAuth) return props.children;

  // todo  将存放在redux中的token取出
  const token:string =   store.getState().user.token;
  if (!token) return <Navigate to="/login" replace/>
  store.dispatch(setUserMenu(menuList))
  return props.children;
}

export default AuthRouter;

