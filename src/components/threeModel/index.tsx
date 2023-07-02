import React, {Component} from "react";
import {Camera, Group, Mesh, MeshStandardMaterial, PointLight, Scene} from "three";
import {WebGLRenderer} from "three/src/renderers/WebGLRenderer";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
// import StatsHelper from "@/pages/threeCanvas/tool/statsHelper";
import Tick from './tool/tick'
import ThreeGroup from './group'
import TitleSvgDecoration from '@/components/svg/title'
import styled from "styled-components";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

const ChartPannel  = styled.div<{
  flex:number
}>`
  flex:${props => props.flex};
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
  
  /* box-shadow: 15px 30px  rgba(0, 0, 0, .4); */
`

interface IModelProps{
  loadingCallBack? : Function;
}

export default class ThreeModel extends Component<IModelProps, any>{
  private scene:Scene;
  private camera:Camera;
  private model:Group;
  private renderer:WebGLRenderer;
  private controls:OrbitControls;
  private stats:Stats;
  private pointLight:PointLight;
  private tick :any;
  private manager:THREE.LoadingManager
  componentWillMount(){
    this.initScence()
  }
  initScence(){
    this.scene= new THREE.Scene()
    this.model = new THREE.Group();
    
    this.manager = new THREE.LoadingManager(() => {
      console.log('loog')
       if(this.props.loadingCallBack){
        setTimeout(this.props.loadingCallBack,100)
        // this.props.loadingCallBack()
        // this.scene.onAfterRender=()=>{
        //    this.props.loadingCallBack()
        // }
      }
    });
   
    this.scene.add(this.model)
  }
  componentDidMount() {
    this.init();
  }
  addLight(){
    const pointLight = this.pointLight = new THREE.PointLight(0xffffff,0.5)
    pointLight.position.set(150,150,-10)
    this.scene.add(pointLight)

    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    this.scene.add(ambientLight)

  }
  addHelper(){
    const active = window.location.hash.includes("debug")
    if (active) {
      const stats = this.stats = new Stats();
      document.body.appendChild(stats.dom);
      const grid:any = new THREE.GridHelper(1500, 50)

      grid.material.opacity = 0.5
      grid.material.depthWrite = false
      grid.material.transparent = true
      this.scene.add(grid)

      const axisHelper = new THREE.AxesHelper(1000);
      this.scene.add(axisHelper);
    }
    
  }
  initControler(){
    const controls = this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    // 是否有惯性
    controls.enableDamping = true;
    // 是否可以缩放
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.addEventListener('change', this.handleControl)
  }
  init = () => {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 1080, 1, 100000)
    this.camera = camera
    camera.position.set(150,150,-10)
    this.addLight()
    
    this.addHelper()
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true } )
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(this.scene, camera)
    renderer.setClearColor(new THREE.Color(0,0,0))
    // renderer.setClearColor(0xEEEEEE, 0.0) // 设置背景为透明
    renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer = renderer
    document.getElementById('stage').appendChild(renderer.domElement)

    this.addSkyBox()
    this.initControler()
    this.tick = Tick(this.animate)
    window.onresize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
  }
  addSkyBox=()=>{
    const rgbeLoader = new RGBELoader(this.manager);
    rgbeLoader.loadAsync('assets/hdr/skyBox5.hdr').then(texture => {
      // texture.mapping = THREE.EquirectangularReflectionMapping;
      // scene.background = texture;
      const geometry = new THREE.SphereGeometry(1000,500,500)
      const material = new THREE.MeshBasicMaterial({map:texture,side:THREE.BackSide})
      const mesh = new THREE.Mesh(geometry,material)
      this.scene.add(mesh)
      this.renderer.render(this.scene, this.camera)
      
      if(this.props.loadingCallBack){
        // this.scene.onAfterRender=()=>{
        //    this.props.loadingCallBack()
        // }
      }
    });
  }
  handleControl = () => {
    this.renderer.render(this.scene, this.camera)
  }

  animate = () => {
    if(this.model){
      this.model.rotation.y += 0.002
    }
    if(this.controls){
       this.controls.update()
    }
    if(this.stats){
      this.stats.update();
    }
    // this.pointLight.position.set(this.camera.position.x, this.camera.position.y,this.camera.position.z)
   
    this.renderer.render(this.scene, this.camera)
  }

  render(){
    return (
      <div id="stage" className="tw-absolute tw-w-full tw-h-full ">
        <ThreeGroup src={""} group={this.model} scale={new THREE.Vector3(0.5, 0.5, 0.5)}/> 
      </div>
    )
  }
}
