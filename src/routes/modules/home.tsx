import {RouteObject} from "@/routes/interface"
import Home from "@/pages/home";

//首页模块
const homeRouter:Array<RouteObject> = [
  {
    path:"/home",
    element:<Home/>,
    meta:{
      requiresAuth:true,
      title:"主页",
      key:"home"
    }
  }
]
export default homeRouter;
