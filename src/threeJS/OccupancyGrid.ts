import  SceneSubject  from './SceneSubject'
import * as THREE from 'three'
import SceneManager from './SceneManager';
import { BufferGeometry } from 'three';

export class Map implements SceneSubject{
    public map: THREE.Points;
    public rotation: THREE.Vector3;
    public speed: THREE.Vector3;
    public width: number
    public height: number 

    private count: number = 0
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
      geometry.attributes.position.needsUpdate = true;
      geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
      geometry.computeBoundingBox();

      return geometry;
    }

    generatePointcloud( color, width, length ) {
      const threshold = 0.1;
			const pointSize = 0.08;
      const geometry = this.generatePointCloudGeometry( color, width, length );
      const material = new THREE.PointsMaterial( { size: pointSize, color: 0xff44ff } );
    
      return new THREE.Points( geometry, material );

    }

    constructor(private sceneManager: SceneManager){
      const scene = sceneManager.getScene()
      this.width = 80;
      this.height = 160;

      const pcBuffer = this.generatePointcloud( new THREE.Color( 107, 0, 168 ), this.width, this.height );
      pcBuffer.scale.set( 10, 5, 10);
      pcBuffer.position.set( 0, 0, 0);
      pcBuffer.rotateOnWorldAxis(new THREE.Vector3(0,1,0), Math.PI/4);
      pcBuffer.rotateOnWorldAxis(new THREE.Vector3(1,0,0), -Math.PI/10);
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
      this.map.rotateOnWorldAxis(new THREE.Vector3(0,1,0), 0.00001);
      var geometry = this.map.geometry as BufferGeometry
      var positions = geometry.attributes.position
      // var colors = geometry.attributes
      const width = this.width
      const length = this.height
      let k = 0;

      this.count += 0.001;
      positions.needsUpdate = true; 
      // console.log(this.map.position)
    }
}