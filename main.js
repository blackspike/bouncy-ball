import './main.css'
import gsap from 'gsap'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'


// Canvas
const canvas = document.getElementById('canvas')

// Scene
const scene = new THREE.Scene()

/**
 * Model & gsap animation
 */

  const mtlLoader = new MTLLoader()
  const objLoader = new OBJLoader()
  const url = 'ball.mtl'

  mtlLoader.setPath('Ball/')

  mtlLoader.load(url, (materials) => {
    materials.preload()

    objLoader.setMaterials(materials)
    objLoader.setPath('Ball/')
    objLoader.load(
      'ball.obj',
      (ball) => {
        scene.add(ball)

        const tl = gsap.timeline({
          defaults: { duration: 2.5, ease: 'Bounce.easeOut' },
          onComplete: function () {
            this.restart()
          },
        })
        const tlRot = gsap.timeline({
          defaults: { duration: 2.5 },
          onComplete: function () {
            this.restart()
          },
        })

        tl.to(ball.position, { x: 0, y: -.2, z: 3 })
          .to(ball.position, { x: -2, y: 0, z: 0 })
          .to(ball.position, { x: 2, y: 0, z: 0 })
          .to(ball.position, { x: 0, y: 0, z: 0, ease: 'ease.easeOut'  })

        tlRot.to(ball.rotation, { x: 0, y: 0, z: 0 })
          .to(ball.rotation, { x: Math.PI, y: Math.PI, z: Math.PI })


      },
    )
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
camera.position.y = 0
camera.position.z = 4
scene.add(camera)


// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Lights
 */

const backlight = new THREE.DirectionalLight(0xffffff, 1)
backlight.position.set(0,0,0)
backlight.castShadow = true
backlight.shadow.mapSize.width = 1024
backlight.shadow.mapSize.height = 1024
scene.add(backlight)

const light = new THREE.AmbientLight(0xffffff, 1.5) // soft white light
scene.add(light)
scene.background = new THREE.Color(0x0d4db5)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
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
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
