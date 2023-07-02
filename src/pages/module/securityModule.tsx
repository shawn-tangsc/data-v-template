
import React from "react"
import Module from './index'
import {ChartPannel} from './style'
import Border1 from "@/components/border/border1"
export default class SecurityModule extends Module{
  constructor(props:any){
    super(props,1)
  }
  renderLeft(){
    return (
      <>
        <Border1 flex={2} title={"告警概览"}></Border1>
        <div style={{height:'10px'}}></div>
        <Border1 flex={3} title={"告警占比"}></Border1> 
        <div style={{height:'10px'}}></div>
        <Border1 flex={2} title={"告警趋势"}></Border1> 
      </>
    );
  }
  renderRight(){
    return (
      <>
        <Border1 flex={2} title={"告警事件"}></Border1>
        <div style={{height:'10px'}}></div>
        <Border1 flex={2} title={"处置预案"}></Border1>
      </>
    );
  }
  renderBottom(){
    return (
      <>
        <Border1 flex={1} title={"视频监控"}></Border1>
      </>
    );
  }
}