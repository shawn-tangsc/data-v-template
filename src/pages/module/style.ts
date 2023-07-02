import styled, { keyframes } from "styled-components"
const moveInLeft = keyframes`
  0% {
    display:flex;
    transform:translateX(-100%);
  }
  100% {
    transform:translateX(0);
    display:flex;
    
  }
`
const moveOutLeft = keyframes`
  0% {
    opacity: 1;
    transform:translateX(0);
  }
  100% {
    opacity: 0;
    transform:translateX(-100%);
    display:none;
  }
`
const moveInRight = keyframes`
  0% {
   
    transform:translateX(100%);
  }
  100% {
    transform:translateX(0);
  }
`

const moveOutRight = keyframes`
  0% {
    opacity: 1;
    transform:translateX(0);
  }
  100% {
    opacity: 0;
    transform:translateX(100%);
    display:none;
  }
`

const moveInBottom = keyframes`
  0% {
    display:flex;
    transform:translateY(100%);
  }
  100% {
    transform:translateY(0);
    display:flex;
  }
`
const moveOuBottom = keyframes`
  0% {
    opacity: 1;
    transform:translateY(0);
  }
  100% {
    opacity: 0;
    transform:translateY(100%);
    display:none;
  }
`
export const ChartPannel = styled.div<{
  flex?: number
}>`
  flex:${props => props.flex || 1};
  height: 325px;
  border:1px solid;
  border-image: linear-gradient(rgba(100, 105, 105, 0) 20%, rgb(228, 229, 229) 75%, rgb(66, 193, 247)) 40 40 20 / 1 / 0 stretch;
  border-top-left-radius: 15px;
  background-image: linear-gradient(#010e12, #010e1200);
  backdrop-filter:blur(10px);
  box-shadow:0 0 7px #000;
  display: flex;
  flex-direction: column;
  padding: 20px;
  pointer-events: auto;
  
  /* box-shadow: 15px 30px  rgba(0, 0, 0, .4); */
`

export const PannelBody = styled.div<{
  active: boolean,
  width: string,
  height: string
}>`
  pointer-events:'auto';
  display: flex;
  flex-direction:column;
  width: ${props => props.width};
  height: ${props => props.height};
`
export const LeftPannel = styled(PannelBody) <{
  active: boolean
}>`
  animation: 1.5s ${props => props.active ? moveInLeft : moveOutLeft} ease-out forwards;
`
export const RightPannel = styled(PannelBody) <{
  active: boolean
}>`
  animation: 1.5s ${props => props.active ? moveInRight : moveOutRight} ease-out forwards;
`

export const BottomPannel = styled(PannelBody) <{
  active: boolean
}>`
  animation: 1.5s ${props => props.active ? moveInBottom : moveOuBottom} ease-out forwards;
`