
import React from "react"
import Module from './index'
import {ChartPannel} from './style'
import Border1 from "@/components/border/border1"
export default class OverviewModule extends Module{
  constructor(props:any){
    super(props,1)
  }
  renderLeft(){
    return (
      <>
        <Border1 flex={1} title={'项目概览'}>
          <text style={{color:'white'}}> helloworld</text>
        </Border1>
        <div style={{height:'10px'}}></div>
        <Border1 flex={1} title={'园区信息'}></Border1> 
      </>
    );
  }
  renderRight(){
    return (
      <>
        <Border1 flex={1} title={'申请容量'}></Border1> 
        <div style={{height:'10px'}}></div>
        <Border1 flex={1} title={'园区能耗特征'}></Border1> 
      </>
    );
  }
  
}