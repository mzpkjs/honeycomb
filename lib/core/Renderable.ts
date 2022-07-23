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
    let child = element.children.item(i) as SVGElement | string | null
    const shapeChild = shape.children[i]
    if (child === null) {
      if (shapeChild instanceof Shape) {
        child = document.createElementNS("http://www.w3.org/2000/svg", shapeChild.tagName)
        element.appendChild(child)
      } else if (element.textContent.length === 0) {
        element.append(shapeChild)
      }
    } else if (typeof shapeChild === "string") {
      throw new Error("Sad noises...")
    }

    if (child && typeof child !== "string" && typeof shapeChild !== "string") {
      f(child, shapeChild)
    }
  }
}

class Renderable {
  private readonly _updater: (camera: Camera) => Shape
  private readonly _camera: Camera;
  private readonly _root: SVGElement

  constructor(camera: Camera, updater: (camera: Camera) => Shape) {
    this._camera = camera;
    this._updater = updater
    this._root = document.createElementNS("http://www.w3.org/2000/svg", "g")
  }

  public update(): void {
    const patch = this._updater(this._camera)
    f(this._root, patch)
  }

  public get reference() {
    return this._root
  }
}

export default Renderable