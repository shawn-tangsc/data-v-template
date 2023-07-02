import React,{Component} from "react"
// import { connect } from "react-redux";
import {connect} from '@/decorators/storeConnect'
import ThreeModel from '../components/threeModel'
import TitleContiner from "@/components/title"
import styled,{keyframes} from "styled-components";
import MenuContiner from "@/components/menu";
import { IMenuObject } from "@/routes/interface";
import { AppState } from "@/store";
export interface IModuleProps{
  active:boolean
}

const LoadingPannel  = styled.div`
  background-image: linear-gradient(#010e12, #010e1200);
  backdrop-filter:blur(30px);
  box-shadow:0 0 7px #000;
`
interface IHomeState{
   loading:boolean
}

const mapStateToProps = (state:AppState) => ({
  userMenu:state.user.menuList
})
@connect(mapStateToProps,null)
export default class Home extends Component<any,IHomeState>{
  state:IHomeState
  
  constructor(props:any){
    super(props)
    this.state = {
      loading:false
    }
    console.log(props)
  }
  complateLoading=()=>{
    this.setState({
      loading:true
    })
  }
  click=()=>{
    this.setState({
      loading:true
    })
  }
  componentDidUpdate=()=>{
    console.log(this.props)
  }
  render(){
    return (
      <>
        <ThreeModel loadingCallBack={this.complateLoading}/>
        {
          this.state.loading?(
          <div className="tw-absolute tw-top-0 tw-left-0" style={{width:'100vw',height:'100vh',display:'flex',flexDirection:'column',pointerEvents:'none'}}>
            <TitleContiner/>
            <div className=" tw-flex tw-flex-1 tw-justify-center">
              <MenuContiner menuList={this.props.userMenu}/>
            </div>
            {
              this.props.userMenu.map((item:IMenuObject,index:number)=>{
                if(item.active){
                  return React.cloneElement(item.element, { active: item.active ,key:index})
                }
              })
            }
          </div>
          ):(
            <LoadingPannel className="tw-absolute tw-top-0 tw-left-0 tw-w-screen tw-h-screen" > loading </LoadingPannel>
          )
      }
      </>
    )
  }
}
// 这个是connect 的常规写法
// const mapStateToProps = (state:AppState) => ({
//   userMenu:state.user.menu
// })

// export default connect(mapStateToProps,null)(Home);