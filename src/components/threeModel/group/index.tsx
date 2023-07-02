import React from 'react'
import GLTFModel from '../model/GLTFModel'
import * as THREE from "three";

interface GroupModel{
  src:''
  group:THREE.Group
  scale:THREE.Vector3
}
// const metaRouters = require.context('../../model',false,/\.glb$/);
// metaRouters.keys().forEach(item=>{
//   console.log(item)
// })
export default class ThreeGroup extends React.Component<GroupModel>{

  private group:THREE.Group;
  componentWillMount(){
    this.init()
  }
  init(){
    const { src, group, scale} = this.props
    this.group = group
    this.group.scale.copy(scale)
    
  }
  render(){

    return (
      <>
        {/* <GLTFModel src={"model/kehuanCity.glb"} scence={this.group} position={{
          x: 0,
          y: 0,
          z: 0,
        }} ></GLTFModel> */}
      </>
    )
  }
}