import React,{useEffect} from 'react'
import styled from 'styled-components'
import TitleSvgDecoration from '@/components/svg/title'

const Continer = styled.div`
  background-image: linear-gradient(#010e12,#010e12D9 30%, #010e1200);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  pointer-events: 'auto';
`
interface ITitlePorps{
  isAnimationBegin?:boolean;
}
const TextView = styled.span`
  color: white;
  font-size: 30px;
  font-weight: bold;
  position: absolute;
  user-select: none;
  top:10px
`

export default function TitleContiner (props:ITitlePorps){
  return (
    <Continer  style={{width:'100vw',height:'70px',pointerEvents:'auto'}}>
      <TitleSvgDecoration style={{width:'100%',height:'100%'}} ></TitleSvgDecoration>
      <TextView> 低碳园区多态能源管理平台</TextView>
    </Continer>
  )
}