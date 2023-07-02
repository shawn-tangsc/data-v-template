import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React from 'react'
interface ModelProps{
  // width: number // 画布宽
  // height: number // 画布高
  // background: string //画布背景色
  position:{x:number,y:number,z:number} 
  // scale:{x:number,y:number,z:number} 
  src:string // 模型url
  scence:any
  callback?:Function
}
export default class GLTFModel extends React.Component<ModelProps>{

  obj3d:any;
  componentDidMount(){
    this.loadModel()
  }
  loadModel(){
    const { src,scence ,position,callback} = this.props

    if (!src) return false
    const loader = new GLTFLoader();
    loader.load(src,(gltf)=>{
      gltf.scene.position.set(position.x,position.y,position.z)
      this.obj3d = gltf.scene
      gltf.scene.traverse(function (object:any) {
        if (object.type === 'Mesh') {
          object.material.depthWrite = true
        }
      })
      scence.add(gltf.scene)
      if(callback){
        callback()
      }
    })
  }
  render():any{
    return null
  }
   
  
}