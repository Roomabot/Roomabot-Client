import  SceneSubject  from './SceneSubject'
import * as THREE from 'three'
import SceneManager from './SceneManager';
import { BufferGeometry } from 'three';
import { MapData } from './MapData';

export class OccupancyGrid implements SceneSubject{
    
    public map: THREE.Points;
    public rotation: THREE.Vector3;
    public speed: THREE.Vector3;
    public width: number
    public height: number 

    private mapNeedsUpdate: boolean;
    private mapData: MapData
    private count: number = 0
    private mapPoints: THREE.Points;


    updatePoints= (positions, colors, alphas) =>{
      const height = this.mapData.info.height
      const width = this.mapData.info.width
      const color = new THREE.Color()
      let k = 0;
      for ( let i = 0; i < height; i ++ ) {

        for ( let j = 0; j < width; j ++ ) {

          let indx = i + (width * j)
          let data = this.mapData.data[indx]

          // grid helper is setup on xz plane
          positions[ 3*k ] = i * 0.05; // x
          positions[ 3*k + 1 ] = 0; // y
          positions[ 3*k + 2 ] = j * 0.05; // z

          
          let val = data === -1 ? 1 : (data === 100 ? .6 : .2);
          color.setRGB(val, val, val)
          const intensity = ( 5 + 0.1 ) * 5;
          colors[ 3 * k ] = color.r;
          colors[ 3 * k + 1 ] = color.g;
          colors[ 3 * k + 2 ] = color.b;

          alphas[k] = data === -1 ? 0 : 1 
          k++
        }

      }

    }
    generateMap(){
      const geometry = new THREE.BufferGeometry();
      
      const numPoints = this.mapData.data.length

      const positions = new Float32Array( numPoints * 3 );
      const colors = new Float32Array( numPoints * 3 );
      const alphas = new Float32Array( numPoints );

      this.updatePoints(positions, colors, alphas)
      
      geometry.setAttribute('position', new THREE.BufferAttribute( positions, 3 ) );
      geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
      geometry.setAttribute( 'alpha', new THREE.BufferAttribute( alphas, 1 ) );
      // geometry.attributes.position.needsUpdate = true;
      geometry.computeBoundingSphere();

      return geometry;
    }

    updateMap = (map: MapData) => {
      if (this.mapData){
        this.mapData = map
        this.mapNeedsUpdate = true
      }
      else{
        this.mapData = map
        this.initMap()
      }
    }
  
    initMap = () => {
      // const pcBuffer = 
      const geometry = this.generateMap();
      const pointSize = 0.1;
      // const material = new THREE.PointsMaterial( { size: pointSize, vertexColors: true  } );
      const uniforms = { color: { value: new THREE.Color( 0xffff00 ) }};
      var shaderMaterial = new THREE.ShaderMaterial( {
        vertexColors: true,
        // uniforms:       uniforms,/
        vertexShader:   document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
        transparent:    true
      });

      const points = new THREE.Points( geometry, shaderMaterial );
      const { width, height } = this.mapData.info
      points.position.set( -(width*0.05)/2, 0, -(0.05*height)/2);
      this.mapPoints = points
      this.sceneManager.addSubject(this)
    }

    redrawPoints() {
      var geometry = this.mapPoints.geometry as BufferGeometry
      var positions = geometry.attributes.position
      var colors = geometry.attributes.color
      var alphas = geometry.attributes.alpha
      this.updatePoints(positions, colors, alphas)
      positions.needsUpdate = true
      colors.needsUpdate = true
      alphas.needsUpdate = true

    }

    constructor(private sceneManager: SceneManager){
      this.sceneManager = sceneManager
      this.width = 80;
      this.height = 160;
    }

    getSubject(): THREE.Object3D {
      return this.mapPoints
    }

    update = () => {
      if (this.mapNeedsUpdate){
          this.redrawPoints()
      }
      this.mapNeedsUpdate = false
    }
}