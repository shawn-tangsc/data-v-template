
import {IMenuObject} from '../routes/interface'
import IncomeAnalysisModule from "@/pages/module/incomeAnalysisModule";
import OverviewModule from "@/pages/module/overviewModule";
import SecurityModule from "@/pages/module/securityModule";
import StrategyModule from "@/pages/module/strategyModule";
//菜单模块
const menuList:Array<IMenuObject> = [
  {
    title:"项目概览",
    element:<OverviewModule />,
    active:true
  },
  {
    title:"策略调度",
    element:<StrategyModule/>,
    active:false
  },
  {
    title:"安全告警",
    element:<SecurityModule/>,
    active:false
  },
  {
    title:"收益分析",
    element:<IncomeAnalysisModule/>,
    active:false
  }
]
export default menuList;
