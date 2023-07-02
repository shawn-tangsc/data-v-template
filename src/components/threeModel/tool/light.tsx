import React , {Component} from 'react'
import * as THREE from 'three'

export class AmbientLight extends Component{
  static defaultProps = {
    color:0xffffff,
    __constructor:'ambientlight',
  }
  render() {
    return <React.Fragment></React.Fragment>;
  }
}

export class DirectionLight extends Component{
  static defaultProps = {
    color: 0xffffff,
    __constructor:'directionlight',
    position: new THREE.Vector3(50,100,50),
    castShadow:true
  }
  render(){
    return <React.Fragment></React.Fragment>
  }
}