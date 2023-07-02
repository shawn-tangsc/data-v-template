import React,{forwardRef,useMemo} from "react";
import useAutoResize from "@/utils/useAutoResize";
import classNames from "classnames";
interface IMenuDecorationProps {
  className?:string;
  style?: React.CSSProperties;
}

const MenuDecoration = forwardRef<HTMLDivElement,IMenuDecorationProps>((props,ref)=>{
  const {width, height, domRef} = useAutoResize(ref)
  const {className,style} = props;
  const classMemo = useMemo(()=>classNames('dv-menu-decoration',className),[className])

  return (<div className={classMemo} style={style} ref={domRef}>
    <svg width={width} height={height}>
      <defs>
          <linearGradient id="menubg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#08233300" />
          <stop offset="100%"  stopColor="#082333FF"/>
        </linearGradient>
      </defs>
      <path d={`M 0 0 Q 50 ${height} 100 ${height}  L ${width-100}  ${height} Q ${width-50} ${height} ${width} 0 `}
      fill={'url(#menubg)'} />
    </svg>
  </div>)
})
export default MenuDecoration;