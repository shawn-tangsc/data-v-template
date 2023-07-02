
import React from "react"
import Module from './index'
import {ChartPannel} from './style'
import Border1 from "@/components/border/border1"
export default class IncomeAnalysisModule extends Module{
  constructor(props:any){
    super(props,1)
  }
  renderLeft(){
    return (
      <>
        <Border1 flex={2} title={"收益概览"}></Border1>
        <div style={{height:'10px'}}></div>
        <Border1 flex={1} title={"投资回收进度"}></Border1> 
        <div style={{height:'10px'}}></div>
        <Border1 flex={2} title={"投资成本占比"}></Border1> 
      </>
    );
  }
  renderRight(){
    return (
      <>
        <Border1 flex={1} title={"节能减排效益"}></Border1>
        <div style={{height:'10px'}}></div>
        <Border1 flex={1} title={"绿电占比"}></Border1>
      </>
    );
  }
}