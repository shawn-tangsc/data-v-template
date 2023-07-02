import React,{Component,ReactNode} from "react";

export interface IBorderProps{
  flex:number;
  title:string;
  width?:string;
  height?:string;
  children?:ReactNode;
}
/**
 * border 基类，
 */
export default class Border<P extends IBorderProps,U> extends Component<P,U>{
  constructor(props:P){
    super(props)
  }
  render(): React.ReactNode {
    return (<>
      {this.props.children}
    </>)
  }
}