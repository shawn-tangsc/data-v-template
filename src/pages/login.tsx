import React , {Component} from 'react'
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {WebGLRenderer} from "three/src/renderers/WebGLRenderer";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import _ from 'lodash'
import styled from 'styled-components'
import {Button, Form, Input, message} from 'antd';
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";
// import  Login  from '@/api/interface';
import Login from '@/api/login';
import { loginApi } from '@/api/login'
import md5 from "js-md5";
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setUserMenu, setUserToken } from '@/store/user/userSlice'
import menuList from '@/config/menuList'
// 类组件不能像函数组件那样直接使用useNavigate
export const withNavigation = (Component:any) => {
  return (props:any) => <Component {...props} navigate={useNavigate()} />;
};
const LoginDiv = styled.div`
  position: absolute;
  top:50%;
  left: 50%;
  width: 385px;
  height: 325px;
  margin-top: -${325/2}px;
  margin-left: -${385/2}px;
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
interface ILoginComponentState{
  loading:boolean;
}

 class Login extends Component<any, ILoginComponentState>{
  private scene:any
  private camera:any
  private renderer:WebGLRenderer
  private controls:OrbitControls
  private parameters:any;
  private zAxisNumber:number;
  private depth:number =1000
  private materials:any = []
  private particlesFrist: any[];
  private spriteCount:number = 500;
  private form :any;
  state:ILoginComponentState
  constructor(props:any){
    super(props)
    this.state = {
      loading:false
    }
  }
  componentDidMount() {
    this.init()
    this.animate()
  }
  async init(){
    let scene = this.scene = new THREE.Scene();
    // scene.fog = new THREE.Fog(0x000000, 0, 3000)
    this.initCamera()
    // new THREE.TextureLoader().load('../assets/images/sky.png',(texture)=>{
    //   console.log('111')
    //   const geometry = new THREE.BoxGeometry(window.innerWidth,window.innerHeight,1100)
    //   const material = new THREE.MeshBasicMaterial({map:texture,side:THREE.BackSide})
    //   const mesh = new THREE.Mesh(geometry,material)
    //   this.scene.add(mesh)
    //   this.renderer.render(this.scene, this.camera)
    // },null,(err:ErrorEvent)=>{
    //   console.log(err)
    // })    
    const rgbeLoader = new RGBELoader();
    let texture = rgbeLoader.loadAsync('assets/hdr/skyBox5.hdr').then(texture => {
      // texture.mapping = THREE.EquirectangularReflectionMapping;
      // scene.background = texture;
      
      const geometry = new THREE.SphereGeometry(this.depth,500,500)
      const material = new THREE.MeshBasicMaterial({map:texture,side:THREE.BackSide})
      const mesh = new THREE.Mesh(geometry,material)
      this.scene.add(mesh)
      this.renderer.render(this.scene, this.camera)
    });
    // const axisHelper = new THREE.AxesHelper(1000);
    // this.scene.add(axisHelper);
    this.initSceneStar().then(res=>{
       this.particlesFrist  = res;
       this.renderStarMove()
    })
    this.initRenderer()
    this.initControls()
    window.onresize = () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    };
  }
  initCamera (){

    /**
     * 为了避免边缘变形，这里将fov角度设置小一些，距离拉远一些
     * 固定视域角度，求需要多少距离才能满足完整的视野画面
     * 15度等于(Math.PI / 12)
     */
    const camera =this.camera= new THREE.PerspectiveCamera(120,window.innerWidth / window.innerHeight,1,10000)
   
    const distance = window.innerWidth/2/Math.tan(Math.PI/12)
    const zAxisNumber =this.zAxisNumber= Math.floor(distance - this.depth / 2)
    const cameraTarget = new THREE.Vector3(0, 0, 0)
    this.camera.position.set(0,0,this.depth)
    this.camera.lookAt(cameraTarget)
    
  }
  async initSceneStar (){
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const pointsGeometry: any[] = []
    const textureLoader = new THREE.TextureLoader();
    const sprite1 = await textureLoader.loadAsync('assets/images/starflake1.png')
    const sprite2 = await textureLoader.loadAsync('assets/images/starflake2.png')

    this.parameters=[
      [[0.6,100,0.75],sprite1,5],
      [[0,0,1],sprite2,2]
    ]
    // 初始化500个节点
    for(let i=0;i<this.spriteCount;i++){
      const x: number = THREE.MathUtils.randFloatSpread(window.innerWidth)
      const y: number = _.random(-window.innerHeight/2,window.innerHeight/2)
      const z: number = _.random(-this.depth , this.depth)
      vertices.push(x,y,z)
    }
    geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3))
    for(let i =0;i<this.parameters.length;i++){
      const color = this.parameters[i][0]
      const sprite = this.parameters[i][1]
      const size = this.parameters[i][2]
      this.materials[i]= new THREE.PointsMaterial({
        size,
        map:sprite,
        blending:THREE.AdditiveBlending,
        depthTest:true,
        transparent:true
      })
      this.materials[i].color.setHSL(color[0],color[1],color[2])
      const particles = new THREE.Points(geometry,this.materials[i])
      particles.rotation.x = Math.random() * 0.2 - 0.15
      particles.rotation.y = Math.random() * 0.2 - 0.15
      particles.rotation.z = Math.random() * 0.2 - 0.15
      // particles.position.setZ(-this.depth)
      pointsGeometry.push(particles)
      this.scene.add(particles)
    }
    return pointsGeometry
  }
  initControls(){
    const controls = this.controls = new OrbitControls(this.camera,this.renderer.domElement)
    // 是否有惯性
    this.controls.enableDamping = true;
     // 是否可以缩放
    this.controls.enableZoom = true;
    this.controls.enablePan = false;
    
    this.controls.addEventListener('change',this.handleControl)
    this.controls.update();
  }
  handleControl = () => {
    this.renderer.render(this.scene, this.camera)
  }
  animate = () => {
    requestAnimationFrame(this.animate);
    if(this.controls){
       this.controls.update()
    }
    this.renderStarMove()
    this.renderer.render(this.scene, this.camera)
  }
  renderStarMove(){
    if(!this.particlesFrist){
      return;
    }
    this.particlesFrist.forEach((item:any)=>{
      let geoPositon = item.geometry.attributes.position;
      for(let i =0;i<this.spriteCount;i++){
        // console.log(geoPositon[i])
        const i3 = i * 3
        if(geoPositon.array[i3+2]<this.depth){
          geoPositon.array[i3+2] += 0.05
        }else{
          geoPositon.array[i3+2] = -this.depth
        }
        
      }
      geoPositon.needsUpdate = true
    })
  }
  initRenderer (){
    const renderer=this.renderer = new THREE.WebGL1Renderer({antialias:true,alpha:true});
    renderer.setSize(window.innerWidth,window.innerHeight)
    renderer.render(this.scene,this.camera)
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(new THREE.Color(0,0,0))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    document.getElementById('login-three-container').appendChild(renderer.domElement)
    this.renderer.render(this.scene, this.camera)
  }
   onFinish=async (loginForm:Login.ReqLoginForm)=>{
    
    try{
      this.setState({loading:true})
      loginForm.password = md5(loginForm.password)
      const {data} = await loginApi(loginForm);
      let {setUserToken,setUserMenu} = this.props
      setUserToken({ token: data.access_token })
      setUserMenu(menuList)
      this.props.navigate('/');
    }catch(error){
      console.log(error)
    }finally{
      this.setState({loading:false})
    }
  }
  onFinishFailed(errorInfo:any){
    console.log("Failed:",errorInfo)
  }
  render() {
    // const [form] = Form.useForm();
    return (
      <>
        <div id="login-three-container" className='tw-absolute'></div>
        <LoginDiv>
          <div style={{color:'white',width:'100%',height:'50px',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'20px'}}>
            <div style={{fontSize:'28px',fontWeight:'bold',whiteSpace:'nowrap',userSelect:'none'}}>低碳园区多态能源管理平台</div>
          </div>
          <Form name = "basic" 
                labelCol={{ span: 5 }}
			          initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
			          size="large"
			          autoComplete="off">
            <Form.Item name="username" rules={[{required:true,message:"请输入用户名"}]}>
              <Input placeholder="用户名：admin" prefix={<UserOutlined/>}/>
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
              <Input.Password autoComplete="new-password" placeholder="密码：123456" prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'30px'}}>
            
              <Button style={{display:'flex',alignItems:'center',justifyContent:'center',width:'200px'}}  type="primary" htmlType="submit" loading={this.state.loading} icon={<UserOutlined />}>
                {'登录'}
              </Button>
            </Form.Item>
          </Form>
        </LoginDiv>
        {/* <div className='tw-absolute tw-left-1/2 tw-top-1/2 tw-bg-black ' style={{width:'385px',height:"325px"}}></div> */}
        {/* <img src="../assets/images/sky.png" alt="" /> */}
      </>
    );
  }
}
// 类组件不能像函数组件那样直接用useDispatch 和useSelect
const mapDispatchToProps = {setUserToken,setUserMenu}

export default withNavigation(connect(null, mapDispatchToProps)(Login));
