import Hexagon from "./entities/Hexagon"
import Renderer from "./core/Renderer"
import InteractionEngine from "./core/engines/InteractionEngine"
import Camera from "./core/Camera"

export default function main(data) {
  console.log("Your version is:", import.meta.env.VITE_VERSION);
  const root = document.querySelector<HTMLElement>("#application")

  if (root) {
    const camera = new Camera(root)
    const engine = new InteractionEngine(root, camera)
    const renderer = new Renderer(root, camera)

    const hexagons = []
    for (let y = 0; y < 25; y++) {
      for (let x = 0; x < 25; x++) {
        hexagons.push(new Hexagon(x, y))
      }
    }

    const foo = () => {
      for (let y = 0; y < 25; y++) {
        for (let x = 0; x < 25; x++) {
          renderer.render(hexagons[y * x])
        }
      }
      engine.update()
      requestAnimationFrame(foo)
    }

    foo()
    camera.set({ x: 0, y: 0 })
  }
}