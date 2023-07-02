import React from 'react'
import * as THREE from 'three'
import Tick from '../tool/tick'

const GElement = {
  directionLight :{
    create({color = 0xffffff,position = new THREE.Vector3(-30,30,30),castShadow=true}){
      const direction_light = new THREE.DirectionalLight(new THREE.Color(color),0.6);
      direction_light.position.set(position.x,position.y,position.z)
      direction_light.castShadow = castShadow
      return direction_light
    }
  },
  ambientLight:{
    create({color=0xffffff}={}){
      const ambient_light = new THREE.AmbientLight(new THREE.Color(color))
      return ambient_light
    }
  }
}

interface ModelProps{
  width: number // 画布宽
  height: number // 画布高
  background: string //画布背景色
  position:{x:number,y:number,z:number} 
  scale:{x:number,y:number,z:number} 
  src:string // 模型url

}

class Model extends React.Component<ModelProps>{
  static DEFAULT_PROPS = {
    width: 1920,
    height: 1080,
    antialias: true,
    loader: '',
    baseUrl: '',
    texPath: '',
    position: { x: 0, y: 0, z: 0 },
    scale: { x: 0.8, y: 0.8, z: 0.8 },
    rotation: { x: 0, y: 0, z: 0 },
    background: '#D2E0F1',
    enableKeys: false,
    enableRotate: true,
    enableZoom: false,
    enabled: true,
    src: '',
  }
  obj3d:any
  lights:any[]
  
}