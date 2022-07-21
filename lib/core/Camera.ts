import Vector, { scale, subtract } from "../utilities/vector"
import Matrix, { identity, rotate } from "../utilities/matrix"
import { clamp } from "../utilities/number"

class Camera {
  public static readonly ZOOM_MAXIMUM = 1.75
  public static readonly ZOOM_MINIMUM = 0.25

  public projection: Matrix = identity()
  private readonly _element: HTMLElement

  constructor(element: HTMLElement) {
    this._element = element
  }

  public set(view: { x?: number, y?: number, z?: number }): void {
    const { x: width, y: height } = this.dimensions
    if (view.x !== undefined) {
      this.projection.tx = view.x + width / 2
    }
    if (view.y !== undefined) {
      this.projection.ty = view.y + height / 2
    }
    if (view.z !== undefined) {
      view.z = clamp(view.z, [ Camera.ZOOM_MINIMUM, Camera.ZOOM_MAXIMUM ])
      this.projection.a = view.z
      this.projection.d = view.z
    }
  }

  public rotate(radian: number): void {
    this.projection = rotate(this.projection, radian)
  }

  public get position(): Vector {
    const { tx: x, ty: y } = this.projection
    return subtract(scale(this.dimensions, 0.5), { x, y })
  }

  public get dimensions(): Vector {
    const { offsetWidth: x, offsetHeight: y} = this._element
    return { x, y }
  }

  public get zoom() {
    const { x: xScale, y: yScale } = Matrix.get.scale(this.projection)
    return (xScale + yScale) / 2
  }

  public get rotation() {
    return Matrix.get.rotation(this.projection)
  }
}

export default Camera