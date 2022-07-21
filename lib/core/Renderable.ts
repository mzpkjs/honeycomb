import Camera from "./Camera"
import Shape from "./Shape"

const f = (element: SVGElement, shape: Shape) => {
  if (shape.tagName !== element.tagName) {
    // ?
  }

  for (const [attribute, value] of shape.attributes) {
    if (element.getAttribute(attribute) !== value) {
      element.setAttribute(attribute, value)
    }
  }

  for (let i = 0; i < shape.children.length; i++) {
    let child = element.children.item(i) as SVGElement | null
    if (child === null) {
      child = document.createElementNS("http://www.w3.org/2000/svg", shape.children[i].tagName)
      element.appendChild(child)
    }
    f(child, shape.children[i])
  }
}

class Renderable {
  private readonly _updater: () => Shape
  private readonly _root: SVGElement

  constructor(camera: Camera, updater: () => Shape) {
    this._updater = updater
    this._root = document.createElementNS("http://www.w3.org/2000/svg", "g")
  }

  public update(): void {
    const patch = this._updater()
    f(this._root, patch)
  }

  public get reference() {
    return this._root
  }
}

export default Renderable