import React from "react"
import Module from './index'
import {ChartPannel} from './style'
import Border1 from "@/components/border/border1"
export default class StrategyModule extends Module{
  constructor(props:any){
    super(props,2)
  }
  renderLeft(){
    return (<>
        <Border1 flex={1}  title={"储能监测"}></Border1>
        <div style={{height:'10px'}}></div>
        <Border1 flex={1} title={"光伏预测曲线"}></Border1> 
    </>);
  }
  renderRight(){
    return (<>
        <Border1 flex={1}  title={"园区度电成本"}></Border1>
        <div style={{height:'10px'}}></div>
        <Border1 flex={1}  title={"电量/电费成本"}></Border1>
    </>);
  }
   renderBottom(){
    return (<>
      <Border1 flex={1}  title={"电量/电费成本"}></Border1>
    </>);
  }
}