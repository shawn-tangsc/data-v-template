
import React,{Component, ReactElement, ReactNode} from "react"
import {LeftPannel,BottomPannel,RightPannel} from './style'


interface ISwitchProps {
  caseType: number;
  children:any
} 
const Switch = (props:ISwitchProps) => {
  const { caseType, children } = props
  console.log(props)
  // filter out only children with a matching prop
  return children.find((child:any) => {
    return child.props.defaultValue === caseType
  })      
}


export interface IModuleProps{
  active?:boolean

}
export interface IModuleState{
  defaultActive?:boolean
  caseType?:number
}
export default class Module extends  Component<IModuleProps, IModuleState>{
  state:IModuleState;
  constructor(props:IModuleProps,caseType:number){
    super(props)
    this.state = {
      defaultActive:this.props.active,
      caseType
    }
  }
  componentDidMount(): void {
      
  }
  componentWillUnMount(){
    
  }
  renderLeft(){
    return (<></>);
  }
  renderRight(){
    return (<></>);
  }
  renderBottom(){
    return (<></>);
  }
  // 第一种布局，只有两边，没有下边
  renderCase1(){
    return(
      <div defaultValue={1} className="tw-w-full tw-h-full tw-flex tw-absolute tw-pointer-events-none " style={{padding:'70px 10px 10px 10px'}} >
        <LeftPannel width="450px" height="100%" active={this.state.defaultActive} >
          {this.renderLeft()}
        </LeftPannel>
        
        <div className=" tw-flex-1 tw-flex tw-flex-col" style={{padding:'50px 10px 0 10px'}}>
          <div className="tw-flex-1"></div>
          <BottomPannel width="100%" height="300px" active={this.state.defaultActive}>
            {this.renderBottom()}
          </BottomPannel>
        </div>
        <RightPannel width="450px"  height="100%" active={this.state.defaultActive} >
          {this.renderRight()}
        </RightPannel>
      </div>
    )
  }
  // 第二种布局，下边的模块非屏幕宽度
  renderCase2(){
    return(
      <div defaultValue={2} className="tw-w-full tw-h-full tw-flex tw-flex-col tw-absolute tw-pointer-events-none" style={{padding:'70px 10px 10px 10px'}} >
        <div className="tw-w-full tw-h-full tw-flex ">
          <LeftPannel width="450px" height="100%" active={this.state.defaultActive} >
            {this.renderLeft()}
          </LeftPannel>
          <div className=" tw-flex-1">
            
          </div>
          
          <RightPannel width="450px"  height="100%" active={this.state.defaultActive} >
            {this.renderRight()}
          </RightPannel>
        </div>
        
        <div className=" tw-flex-1 tw-flex tw-flex-col"style={{paddingTop:'10px'}} >
          <BottomPannel width="100%" height="300px" active={this.state.defaultActive}>
            {this.renderBottom()}
          </BottomPannel>
        </div>
      </div>
    )
  }

  render(){
    return ( <>
    <Switch caseType={this.state.caseType}>
        {this.renderCase1()}
        {this.renderCase2()}
    </Switch>
     
    </>
    )
  }
}