import  SceneSubject  from './SceneSubject'
import * as THREE from 'three'
import SceneManager from './SceneManager';
import { BufferGeometry } from 'three';
import { _mock } from '../_mock_occupancy_grid'

export class OccupancyGrid implements SceneSubject{
    public map: THREE.Points;
    public rotation: THREE.Vector3;
    public speed: THREE.Vector3;
    public width: number
    public height: number 

    private count: number = 0

    generateFromDump(){
      var dump = _mock
      const geometry = new THREE.BufferGeometry();
      const height = dump.info.height
      const width = dump.info.width
      const numPoints = dump.data.length

      const positions = new Float32Array( numPoints * 3 );
      const colors = new Float32Array( numPoints * 3 );
      const color = new THREE.Color()
      let k = 0;
      for ( let i = 0; i < height; i ++ ) {

        for ( let j = 0; j < width; j ++ ) {

          let indx = i + (width * j)
          let data = dump.data[indx]

          // const u = i / width;
          // const v = j / length;
          // const x = 0;
          // const y = 0;
          // const z = v - 0.5;

          // grid helper is setup on xz plane
          positions[ 3*k ] = i * 0.05; // x
          positions[ 3*k + 1 ] = 0; // y
          positions[ 3*k + 2 ] = j * 0.05; // z


          let val = data === -1 ? 1 : (data === 100 ? 1 : .34);
          color.setRGB(val, val, val)
          // colors[ 3*k ] = val
          // colors[ 3*k + 1  ] = val
          // colors[ 3*k + 2  ] = val
          const intensity = ( 5 + 0.1 ) * 5;
          colors[ 3 * k ] = val;
          colors[ 3 * k + 1 ] = val;
          colors[ 3 * k + 2 ] = val;

          k++
        }

      }

      console.info(colors)
      
      geometry.setAttribute('position', new THREE.BufferAttribute( positions, 3 ) );
      geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
      // geometry.attributes.position.needsUpdate = true;
      geometry.computeBoundingSphere();

      return geometry;
    }

    generatePointCloudGeometry( color, width, length ) {

      const geometry = new THREE.BufferGeometry();
      const numPoints = width * length;

      const positions = new Float32Array( numPoints * 3 );
      const colors = new Float32Array( numPoints * 3 );

      let k = 0;

      for ( let i = 0; i < width; i ++ ) {

        for ( let j = 0; j < length; j ++ ) {

          const u = i / width;
          const v = j / length;
          const x = 0;
          const y = 0;
          const z = v - 0.5;

          positions[ 3 * k ] = x;
          positions[ 3 * k + 1 ] = y;
          positions[ 3 * k + 2 ] = z;

          const intensity = ( y + 0.1 ) * 5;
          colors[ 3 * k ] = color.r * intensity;
          colors[ 3 * k + 1 ] = color.g * intensity;
          colors[ 3 * k + 2 ] = color.b * intensity;

          k ++;

        }

      }

      geometry.setAttribute('position', new THREE.BufferAttribute( positions, 3 ) );
      geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
      geometry.attributes.position.needsUpdate = true;
      
      geometry.computeBoundingBox();

      return geometry;
    }

    generatePointcloud( color, width, length ) {
      const threshold = 0.1;
			const pointSize = 0.5;
      const geometry = this.generateFromDump();
      
      const material = new THREE.PointsMaterial( { size: pointSize, vertexColors: true  } );
    
      return new THREE.Points( geometry, material );

    }

    constructor(private sceneManager: SceneManager){
      const scene = sceneManager.getScene()
      this.width = 80;
      this.height = 160;

      const pcBuffer = this.generatePointcloud( new THREE.Color( 107, 0, 168 ), this.width, this.height );
      // pcBuffer.scale.set( 10, 5, 10);
      var dump = _mock
      const height = dump.info.height
      const width = dump.info.width
      const numPoints = dump.data.length
      pcBuffer.position.set( -(width*0.05)/2, 0, -(0.05*height)/2);
      // pcBuffer.rotateOnWorldAxis(new THREE.Vector3(0,1,0), Math.PI/4);
      // pcBuffer.rotateOnWorldAxis(new THREE.Vector3(1,0,0), -Math.PI/10);
      // pcBuffer.rotateOnAxis()
      // pcBuffer.
      // pcBuffer.rotateOnWorldAxis(new THREE.Vector3(1,0,0), -Math.PI/7);
      // pcBuffer.rotateOnWorldAxis(new THREE.Vector3(0, 0,1), Math.PI/6);
      // pcBuffer.rotateOnWorldAxis(new THREE.Vector3(0,1,0), 20);
      this.map = pcBuffer

      sceneManager.addSubject( this )

    }

    getSubject(): THREE.Object3D {
      return this.map
    }

    update = () => {
      // update point cloud map
      // this.map.rotateOnWorldAxis(new THREE.Vector3(0,1,0), 0.00001);
      // var geometry = this.map.geometry as BufferGeometry
      // var positions = geometry.attributes.position
      // // var colors = geometry.attributes
      // const width = this.width
      // const length = this.height
      // let k = 0;

      // this.count += 0.001;
      // positions.needsUpdate = true; 
      // console.log(this.map.position)
    }
}