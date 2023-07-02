import Home from '../pages/home'
import Login from '../pages/login'
import { Navigate, useRoutes } from "react-router-dom";
import {RouteObject} from "@/routes/interface";

const metaRouters = require.context('./modules',false,/\.tsx$/);
export const routerArray: RouteObject[] = [];
metaRouters.keys().forEach(item=>{
  //.default是ES6模块语法中的默认导出（default export）语法。在这段代码中，我们假设每个.tsx文件中都有一个默认导出，该导出是该模块的路由配置数组。因此，我们通过.default属性来获取该默认导出，并将其赋值给com常量。
  //这么写的原因是因为在使用ES6模块语法时，默认导出是通过default属性来获取的。如果模块没有默认导出，那么default属性将会是undefined。
  const com = metaRouters(item).default
  routerArray.push(...com)
})
export const rootRouter:RouteObject[]=[
  {
    path:"/",
    element:<Navigate to="/home"/>
  },
  {
    path:"/login",
    element:<Login/>,
    meta:{
      requiresAuth:false,
      title:"登录页",
      key:"login"
    }
  },
  ...routerArray
]
const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};
export default Router;

