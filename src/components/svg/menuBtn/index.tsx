import React,{forwardRef,useMemo,useEffect,useRef,useState} from "react";
import useAutoResize from "@/utils/useAutoResize";
import classNames from "classnames";
interface IMenuBtnDecorationProps {
  className?:string;
  style?: React.CSSProperties;
  active?:boolean;
  hover?:boolean;
  keyId:number;
}

const MenuBtnDecoration = forwardRef<HTMLDivElement,IMenuBtnDecorationProps>((props,ref)=>{
  const svgRef = useRef(null)
  const {width,height,domRef} = useAutoResize(ref)
  const {className,style,active=false,hover=false,keyId} = props;
  const [isInit,setIsInit] = useState<boolean>(true)
  // useEffect(()=>{
  //   if(!active){
  //     if(svgRef.current.getElementById(`btnlinebegin${keyId}`)){
  //       svgRef.current.getElementById(`btnlinebegin${keyId}`).beginElement();
  //     }
  //   }
   
  // },[hover])
  useEffect(()=>{
    if(active&&!isInit){
      if(svgRef.current.getElementById(`btnlinebegin${keyId}`)){
        svgRef.current.getElementById(`btnlinebegin${keyId}`).beginElement();
       
      }
      if( svgRef.current.getElementById(`flash${keyId}`)){
         svgRef.current.getElementById(`flash${keyId}`).beginElement();
      }
    }
  },[active])
   useEffect(()=>{
    setIsInit(false)
   },[])
  const classMemo = useMemo(()=>classNames('dv-menu-btn-decoration',className),[className])
  return (<div style={style} className={classMemo} ref={domRef}>
    <svg width={width} height={height} ref = {svgRef}>
      <defs>
        <radialGradient id="RadialGradient1">
          <stop offset="0%" stopColor="#fff"/>
          <stop offset="30%" stopColor="#9ae0f8"/>
          <stop offset="35%" stopColor="#5CD3FA"/>
          <stop offset="100%" stopColor="#5CD3FA00"/>
        </radialGradient>
        <linearGradient id="menuBtnBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#052A4200" />
          <stop offset="100%"  stopColor="#052A42FF"/>
        </linearGradient>
        <linearGradient id="menubtnLine1" >
          <stop offset="0%" stopColor={'#96c3f63e'} />
          <stop offset="100%"  stopColor="#15415E00"/>
  
        </linearGradient>
        <linearGradient id="menubtnLine1Active" >
          <stop offset="0%" stopColor={"#BADAFFFF"} />
          <stop offset="100%"  stopColor="#15415E00"/>
  
        </linearGradient>
        <linearGradient id="menubtnLine2" >
          <stop offset="0%" stopColor="#15415F00" />
          <stop offset="100%"  stopColor={'#96c3f63e'}/>
        </linearGradient>
        <linearGradient id="menubtnLine2Active" >
          <stop offset="0%" stopColor="#15415F00" />
          <stop offset="100%"  stopColor={"#BADAFFFF"}/>
        </linearGradient>
          
      </defs>
      <path fill={'url(#menuBtnBg)'} d={`M 20 ${height-19} L 0 ${height} L ${width} ${height} L ${width-20} ${height-19}`} ></path>
      <path fill={'none'} d={`M  0 ${height-2} L ${width} ${height-2} `}  stroke={active||hover?"#BADAFFFF":'#96c3f63e'} strokeWidth='1'>
        {
            <animate 
              id={`btnlinebegin${keyId}`}
              attributeName='stroke-dasharray'
              attributeType='XML'
              from={`0 , ${width/2}, 0, ${width/2}`}
              to={`0 , 0,  ${width} , 0`}
              dur={`2s`}
              begin={'0s'}
              calcMode='spline'
              keyTimes='0;1'
              keySplines='0.4,1,0.49,0.98'
              repeatCount='1'
            />
        }
      </path>
      <path  id={`pathLeft${keyId}`} fill={'none'} d={`M 20 ${height-19} L 0 ${height-2}`} stroke={active||hover?`url(#menubtnLine1Active)`:`url(#menubtnLine1)`} strokeWidth='1' strokeDasharray={`0 , 0,  ${width/2} , 0`}>
          
          {
            <>
              <animate 
                id={`hideLeft${keyId}`}
                attributeName='stroke-dasharray'
                attributeType='XML'
                from={`0 ,${height+2}`}
                to={`0 ,${height+2}`}
                dur={`2s`}
                begin={`0s;btnlinebegin${keyId}.begin`}
                end={`btnlinebegin${keyId}.end`}
                repeatCount='indefinite'
              />
              <animate 
                id={`btnlineLeftBegin${keyId}`}
                attributeName='stroke-dasharray'
                attributeType='XML'
                from={`0 ,${height+2},0,${height+2}`}
                to={`0 , 0,  ${height} , 0`}
                dur={`1s`}
                begin={`hideLeft${keyId}.end`}
                 repeatCount='1'
              />
            </>
        }
      </path>
      
      <path fill={'none'} d={`M ${width} ${height-2} L ${width-20} ${height-19} `}  stroke={active||hover?`url(#menubtnLine2Active)`:`url(#menubtnLine2)`} strokeWidth='1'>
        {
            <>
              <animate 
               id={`hideRight${keyId}`}
                attributeName='stroke-dasharray'
                attributeType='XML'
                from={`0 ,${height-2}`}
                to={`0 ,${height-2}`}
                dur={`2s`}
                begin={`0s;btnlinebegin${keyId}.begin`}
                end={`btnlinebegin${keyId}.end`}
                repeatCount='indefinite'
              />
              <animate 
                id={`btnlineRightBegin${keyId}`}
                attributeName='stroke-dasharray'
                attributeType='XML'
                from={`0 ,${width-20},${width},${height-2}`}
                to={`${height} , ${height},  ${height} , ${height}`}
                dur={`1s`}
                begin={`hideRight${keyId}.end`}
                repeatCount='1'
              />
            </>
        }
      </path>
      {
        active?(<polyline fill="url(#RadialGradient1)"  points={`0,${height} 0,${height-5} ${width},${height-5}  ${width},${height}`}>
          <animate 
                id={`flash${keyId}`}
                attributeName='points'
                attributeType='XML'
                from={`${width/2},${height-3} ${width/2},${height-3} ${width/2},${height-3}  ${width/2},${height-3}`}
                to={`0,${height} 0,${height-5} ${width},${height-5}  ${width},${height}`}
                dur={`2s`}
                begin={'0s'}
                calcMode='spline'
                keyTimes='0;1'
                keySplines='0.4,1,0.49,0.98'
                repeatCount='1'
              />
        </polyline>):<></>
      }
    </svg>
  </div>)
})

export default MenuBtnDecoration