import React,{useEffect,useState} from "react";
import MenuDecoration from "../svg/menu";
import styled from "styled-components";
import MenuBtn from "./menuBtn";
import {IMenuObject} from '@/routes/interface';
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setUserMenu } from "@/store/user/userSlice";
const MenuBtnList = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Continer = styled.div`
  max-width: 890px;
  width: 100%;
  height: 50px;
  display: flex;
  position: relative;
  pointer-events: auto;
`

interface IMenuListProps{
  menuList: Array<IMenuObject>
}
export default function MenuContiner (props:IMenuListProps){
  let {menuList} = props
  const dispatch = useDispatch<AppDispatch>()
  function btnClick(idx:number){
    let next = menuList.map((c,i)=>{
      return {
        ...c,
        active:i===idx
      }
    })
    dispatch(setUserMenu(next))
  }
  return (
    
    <Continer >
      <MenuDecoration style={{width:'100%',height:'100%'}}/>
      <MenuBtnList>
        { menuList&&menuList.map((val,idx)=>{
            return (<MenuBtn btnTitle={val.title} keyId={idx} key={idx} active={val.active} clickCallBack={btnClick}/>)
        })}
      </MenuBtnList>
      
    </Continer>
  )
}