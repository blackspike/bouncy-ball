import './main.css'
// import gsap from 'gsap'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'


// Canvas
const canvas = document.getElementById('canvas')

// Scene
const scene = new THREE.Scene()

/**
 * Model & gsap animation
 */

// Leaf
const leafMtlLoader = new MTLLoader()
const leafObjLoader = new OBJLoader()
leafMtlLoader.load('/Leaf/leaf-2.mtl', (materials) => {
  materials.preload()
  leafObjLoader.setMaterials(materials)
  leafObjLoader.load('/Leaf/leaf-2.obj', (object) => {
    scene.add(object)
    object.position.x = -2.2
  })
})

// Football
const footballMtlLoader = new MTLLoader()
const footballObjLoader = new OBJLoader()
footballMtlLoader.load('/Football/football.mtl', (materials) => {
  materials.preload()
  footballObjLoader.setMaterials(materials)
  footballObjLoader.load('/Football/football.obj', (object) => {
    scene.add(object)
    object.position.x = 2.2
  })
})

// Birdarang
const birdarangMtlLoader = new MTLLoader()
const birdarangObjLoader = new OBJLoader()
birdarangMtlLoader.load('/Birdarang/birdarang.mtl', (materials) => {
  materials.preload()
  console.log(materials)

  birdarangObjLoader.setMaterials(materials)
  birdarangObjLoader.load('/Birdarang/birdarang.obj', (object) => {
    scene.add(object)
    object.position.x = 0
  })
})
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
// const axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 5
camera.position.z = 0
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true

/**
 * Lights
 */

// const sunLight = new THREE.DirectionalLight('#ffffff', 10)
// sunLight.castShadow = true
// sunLight.shadow.camera.far = 15
// sunLight.shadow.mapSize.set(1024, 1024)
// sunLight.shadow.normalBias = 0.05
// sunLight.position.set(10,10,10)
// scene.add(sunLight)


const light = new THREE.AmbientLight(0xffffff, 1) // soft white light
scene.add(light)
scene.background = new THREE.Color(0xffffff)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setClearColor(0xffffff)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
