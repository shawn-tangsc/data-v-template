import React from "react";
import styled,{keyframes} from "styled-components";
import Border,{IBorderProps} from './index'
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
const blurIn = keyframes`
  0% {
     opacity: 0;
    backdrop-filter:blur(0px);
  }
  100% {
     opacity: 1;
    backdrop-filter:blur(20px);
  }
`
export const BGPannel = styled.div<{
  flex?: number
}>`
  flex:${props => props.flex || 1};
  height: 325px;
  border:1px solid;
  border-image: linear-gradient(rgba(100, 105, 105, 0) 20%, rgb(228, 229, 229) 75%, rgb(66, 193, 247)) 40 40 20 / 1 / 0 stretch;
  border-top-left-radius: 15px;
  background-image: linear-gradient(#010e12, #010e1200);
  backdrop-filter:blur(20px);
  box-shadow:0 0 7px #000;
  display: flex;
  flex-direction: column;
  padding: 10px 12px 10px 7px;
  pointer-events: auto;
  animation: 1.5s ${blurIn} linear forwards;
  /* box-shadow: 15px 30px  rgba(0, 0, 0, .4); */
`

const TitleTextContiner = styled.div`
  padding:3px 38px 3px 10px;
  background-color: #062e4d;
  
  align-items: center;
  justify-content: center;
  color:'white';
  display: flex;
  /* clip-path:polygon(0% 0%, 100%-5px 0%,100% 38.31%,80.86% 100%,19.14% 100%); */
`
const TitleTextContinerTrangle = styled.div`
  width: 22px;
  height: 100%;
  background-color: #062e4d;
  clip-path:polygon(0% 0%, 100% 100% ,0 100%); 
`
interface IBorder1Props extends IBorderProps{
  
}

export default class Border1 extends Border<IBorder1Props , any>{
  render(){
    return (
      <>
        <BGPannel flex={this.props.flex}>
          <div className=" tw-w-full tw-h-full" style={{borderBottom:'1px solid #D0DEEEFF'}}>
            <div className = "tw-w-full tw-flex " style={{height:'30px',borderBottom:'1px solid #D0DEEEFF'}}>
              <TitleTextContiner>
                <StarOutlined style={{color:'white'}}/>
                <text style={{color:'white',marginLeft:'5px',userSelect:'none'}}>{this.props.title}</text>
              </TitleTextContiner>
              <TitleTextContinerTrangle/>
              <div className=" tw-flex-1"></div>
            </div>
            {super.render()}
          </div>
        
        </BGPannel>
      </>
      
    )
  }
}