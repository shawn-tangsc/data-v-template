import React,{useState} from "react";
import styled from "styled-components";
import MenuBtnDecoration from "@/components/svg/menuBtn";
const Button = styled.div`
  width: 100px ;
  height: 25px ;
  margin: 0 6px 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  
`

const TextView = styled.span<{
  active:boolean
}>`
  color: ${props => props.active?'white':'#BADAFFFF'};
  font-size: 16px;
  user-select: none;
  position: absolute;
 
  &:hover {
    color: white;
  }
`

interface IMenuBtn {
  btnTitle:string;
  active:boolean;
  keyId:number;
  clickCallBack:Function;
}
export default function MenuBtn(props:IMenuBtn){
  const [hover,setHover] = useState<boolean>(false)
   let {btnTitle,active,keyId,clickCallBack} = props
  function mouseIn(){
    setHover(true)
  }
  function mouseOut (){
    setHover(false)
  }
 
  function btnClick(){
    clickCallBack(keyId)
  }
  return (
  <Button onMouseEnter={mouseIn} onMouseLeave={mouseOut} onClick={btnClick}>
    <MenuBtnDecoration keyId={keyId} active={active} hover={hover} className="tw-w-full tw-h-full"/>
    <TextView active={active}>{btnTitle}</TextView>
    
  </Button>)
}