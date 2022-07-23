import Camera from "./Camera"
import Entity from "./Entity"
import Renderable from "./Renderable"

class Renderer {
  private readonly _camera: Camera
  private readonly _root: SVGSVGElement
  private readonly _canvas: SVGElement
  private readonly _viewport: SVGElement
  private readonly _renderables = new WeakMap<Entity, Renderable>()

  constructor(element: HTMLElement, camera: Camera) {
    this._camera = camera
    element.style.perspective = "1024px"
    this._root = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    this._root.style.transformStyle = "preserve-3d"
    // this._root.style.transform = "rotate3d(-0, 0, 0, 0rad)"
    this._root.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    this._root.setAttribute("version", "1.1")
    this._root.setAttribute("width", "100%")
    this._root.setAttribute("height", "100%")
    this._root.setAttribute("transform", "")
    element.append(this._root)

    this._canvas = document.createElementNS("http://www.w3.org/2000/svg", "g")
    this._viewport = document.createElementNS("http://www.w3.org/2000/svg", "g")
    this._root.append(this._canvas)
    this._canvas.append(this._viewport)
  }

  public render(entity: Entity): void {
    if (!this._renderables.has(entity)) {
      const renderable = new Renderable(this._camera, entity.shape)
      this._renderables.set(entity, renderable)
      this._viewport.append(
        renderable.reference
      )
    }

    const { x: px, y: py, z: pz, a: pa } = this._camera.perspective
    const { x, y } = this._camera.position
    const { tx, ty } = this._camera.projection
    const zoom = this._camera.zoom
    this._root.style.transform = `rotate3d(-1, ${py}, 0, ${pa}rad)`
    // this._root.style.transform = `rotate3d(-1, 0, 0, -75deg)`
    this._canvas.setAttribute("transform", `translate(${tx} ${ty})`)
    this._viewport.setAttribute("transform-origin", `${x} ${y}`)
    this._viewport.setAttribute("transform", `scale(${zoom} ${zoom}) rotate(${this._camera.rotation * (180/Math.PI)})`)
    const renderable = this._renderables.get(entity)
    renderable.update()
  }
}

export default Renderer