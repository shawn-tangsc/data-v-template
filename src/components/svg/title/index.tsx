import React,{forwardRef,useEffect,useMemo, useState} from 'react'
import useAutoResize from '@/utils/useAutoResize'
import classNames from 'classnames';
import {getPolylineLength} from '@/utils/svgUtils'
interface Props {
  className?: string;
  style?: React.CSSProperties;
}
// 为什么一定要使用forwardRef 主要是用于提供useAutoResize()方法来动态修改svg的尺寸
const TitleSvgDecoration = forwardRef<HTMLDivElement, Props>((props,ref)=>{
  const {width,height,domRef} = useAutoResize(ref);
  const { className, style} = props;
  const classNamesMemo = useMemo(()=> classNames('dv-title-decoration',className),[className])
  function calcSVGData(){
    let line1Points=[
      [0, height - 10],
      [width/2 - 465, height - 10],
      [width/2 - 450, height - 25],
      [width/2 - 215, height - 25],
      [width/2 - 195, height],
      [width/2 - 190, height - 10],
      [width/2 + 190, height - 10],
      [width/2 + 195, height ],
      [width/2 + 215, height - 25],
      [width/2 + 450, height - 25],
      [width/2 + 465, height- 10],
      [width, height - 10],
    ]
    let line2Points = [
      [width/2 - 70, height - 13],
      [width/2 + 70, height - 13],
      [width/2 + 70, height - 7],
      [width/2 - 70, height - 7]
    ]
    let line3Points= [
      [width/2 - 465, height],
      [width/2 - 450, height - 25],
      [width/2 - 210, height - 25],
      [width/2 - 195, height],
    ]
    let line4Points= [
      [width/2 + 465, height ],
      [width/2 + 450, height - 25 ],
      [width/2 + 215, height - 25 ],
      [width/2 + 195, height ],
    ]
    let line1PointsLength = getPolylineLength(line1Points)
    let line2PointsLength = getPolylineLength(line2Points)
    let line1PointsStr = line1Points.map(point => point.join(',')).join('  ')
    let line2PointsStr = line2Points.map(point => point.join(',')).join('  ')
    let line3PointsStr = line3Points.map(point => point.join(',')).join('  ')
    let line4PointsStr = line4Points.map(point => point.join(',')).join('  ')
    return {line1PointsStr,line2PointsStr,line1PointsLength,line2PointsLength,line3PointsStr,line4PointsStr}
  }
  const {line1PointsStr,line2PointsStr,line1PointsLength,line2PointsLength,line3PointsStr,line4PointsStr} = useMemo(calcSVGData,[width,height])
 
  let maskArr = new Array(21).fill(0);
  return (
    <div className={classNamesMemo} ref={domRef}  style={style}>
      <svg width={width} height={height}>
        <defs>
          <filter id="blur" x="0" y="0">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
          </filter>
          <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#010e12" />
            <stop offset="100%"  stopColor="#010e1200"/>
          </linearGradient>
            <radialGradient id="RadialGradient1">
              <stop offset="0%" stopColor="#fff"/>
              <stop offset="30%" stopColor="#9ae0f8"/>
              <stop offset="35%" stopColor="#5CD3FA"/>
              <stop offset="100%" stopColor="#5CD3FA00"/>
            </radialGradient>
            <linearGradient id="maskGradient"  >
              <stop offset="0%" stopColor="#000" stopOpacity={'0'}>
                <animate attributeName="stop-color" id='maskGradientBegin' values="#000; #3588EA" begin={'0s'} dur="1s" fill="freeze" repeatCount="1"/>
              </stop>
              <stop offset="80%" stopColor="#000">
                <animate attributeName="stop-color" id='colorAnimateStep2' values="#000; #3588EA" begin='maskGradientBegin.end' dur="1s" fill="freeze" repeatCount="1"/>
                <animate attributeName="stop-color" id='colorAnimate' values="#3588EA; #fff" begin='colorAnimateStep3.end;colorAnimate1.end' dur="3s" fill="freeze" repeatCount="1"/>
                <animate attributeName="stop-color" id='colorAnimate1' values="#fff; #3588EA" begin='colorAnimate.end' dur="3s" fill="freeze" repeatCount="1"/>
              </stop>
              <stop offset="100%" stopColor="#000">
                <animate attributeName="stop-color" id='colorAnimateStep3' values="#000; #fff" begin='colorAnimateStep2.end' dur="1s" fill="freeze" repeatCount="1"/>
              </stop>
            </linearGradient>
            <linearGradient id="linearGradient" >
              <stop offset="0%" stopColor="#fff" stopOpacity={'0'}/>
              <stop offset="25%" stopColor="#fff"/>
              <stop offset="50%" stopColor="#3588EA" />
              <stop offset="75%" stopColor="#fff"/>
              <stop offset="100%" stopColor="#fff" stopOpacity={'0'}/>
            </linearGradient>
            <linearGradient id="maskGradient1" >
              <stop offset="0%" stopColor="#000">
                <animate attributeName="stop-color" id='colorAnimateStep3' values="#000; #fff" begin='colorAnimateStep2.end' dur="1s" fill="freeze" repeatCount="1"/>
              </stop>
              <stop offset="20%" stopColor="#000" >
                <animate attributeName="stop-color" id='colorAnimateStep2' values="#000; #3588EA" begin='maskGradientBegin.end' dur="1s" fill="freeze" repeatCount="1"/>
                <animate attributeName="stop-color" id='colorAnimate' values="#3588EA; #fff" begin='colorAnimateStep3.end;colorAnimate1.end' dur="3s" fill="freeze" repeatCount="1"/>
                <animate attributeName="stop-color" id='colorAnimate1' values="#fff; #3588EA" begin='colorAnimate.end' dur="3s" fill="freeze" repeatCount="1"/>
              </stop>
              <stop offset="100%" stopColor="#000" stopOpacity={'0'}>
                <animate attributeName="stop-color" id='maskGradientBegin' values="#000; #3588EA" begin={'0s'} dur="1s" fill="freeze" repeatCount="1"/>
              </stop>
            </linearGradient>
            <mask id="hole">
              <polyline fill="black" points={line3PointsStr}></polyline>
              {
                maskArr.map((val,idx)=>{
                  return (<polyline  key={`m1${idx}`} fill="white" points={`${width/2 - (205 + idx*12)}, ${height } ${width/2 - (222+idx*12)}, ${height -20} ${width/2 - (225+idx*12)}, ${height -20} ${width/2 - (208+idx*12)}, ${height}`} ></polyline>)
                })
              }
            </mask>
            <mask id="hole2">
              <polyline fill="black" points={line4PointsStr}></polyline>
              {
                maskArr.map((val,idx)=>{
                  return (<polyline fill="white" key={`m2${idx}`} points={`${width/2 + (205 + idx*12)}, ${height} ${width/2 + (222+idx*12)}, ${height -20} ${width/2 + (225+idx*12)}, ${height -20} ${width/2 + (208+idx*12)}, ${height }`} ></polyline>)
                })
              }

            </mask>
        </defs>
        {/* mask="url(#hole)" */}
        <polyline fill="url(#maskGradient)" points={line3PointsStr} mask="url(#hole)"></polyline>
        <polyline fill="url(#maskGradient1)" points={line4PointsStr} mask="url(#hole2)"></polyline>
        <polyline fill={'url(#bg)'} points={`0, 0 ${line1PointsStr} ${width},0`}/>
        <polyline fill='none' stroke='url(#linearGradient)' strokeWidth='1.5' points={line1PointsStr}>
          <animate 
            id='linebegin'
            attributeName='stroke-dasharray'
            attributeType='XML'
            from={`0 ,${line1PointsLength/2},0,${line1PointsLength/2}`}
            to={`0 , 0,  ${line1PointsLength} , 0`}
            dur={`3s`}
            begin={'0s'}
            calcMode='spline'
            keyTimes='0;1'
            keySplines='0.4,1,0.49,0.98'
            repeatCount='1'
          />
        </polyline>
         <polyline fill="url(#RadialGradient1)" strokeWidth='2' points={line2PointsStr}>
            <animate 
                id={`flash`}
                attributeName='points'
                attributeType='XML'
                from={`${width/2},${height-10} ${width/2},${height-10} ${width/2},${height-10}  ${width/2},${height-10}`}
                to={line2PointsStr}
                dur={`2s`}
                begin={'0s'}
                calcMode='spline'
                keyTimes='0;1'
                keySplines='0.4,1,0.49,0.98'
                repeatCount='1'
              />
            <animateTransform
              id="begin"
              attributeName="transform"
              attributeType="XML"
              type="translate"
              from="0 0"
              to="120 0"
              dur="3s"
              begin={'linebegin.end'}
              repeatCount="1"/>
            <animateTransform
              id="toLeft"
              attributeName="transform"
              attributeType="XML"
              type="translate"
              from="120 0"
              to="-120 0"
              dur="3s"
              begin="begin.end;toRight.end"
              repeatCount="1"/>
            <animateTransform
              id="toRight"
              attributeName="transform"
              attributeType="XML"
              type="translate"
              from="-120 0"
              to="120 0"
              dur="3s"
              begin="toLeft.end;"
              repeatCount="1"/>
        </polyline> 
        
      </svg>
    </div>
  )
})

export default TitleSvgDecoration;