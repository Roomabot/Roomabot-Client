export default interface SceneSubject {
    update: Function
    getSubject(): THREE.Object3D
}