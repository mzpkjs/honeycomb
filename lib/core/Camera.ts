import Vector  from "../utilities/vector"
import Matrix from "../utilities/matrix"
import { clamp } from "../utilities/number"

class Camera {
  public static readonly ZOOM_MAXIMUM = 1.75
  public static readonly ZOOM_MINIMUM = 0.25

  public projection: Matrix = Matrix.identity()
  private readonly _element: HTMLElement

  constructor(element: HTMLElement) {
    this._element = element
  }

  public set({ x = 0, y = 0, z = 1 }: { x?: number, y?: number, z?: number }): void {
    const { get, scale, translate } = Matrix
    const { x: width, y: height } = this.dimensions
    const { x: tx, y: ty } = get.translation(this.projection)
    const dx = (x + width / 2) - tx,
      dy = (y + height / 2) - ty
    this.projection = translate(this.projection, { x: dx, y: dy })
    const zoom = clamp(z / this.zoom, [ Camera.ZOOM_MINIMUM, Camera.ZOOM_MAXIMUM ])
    this.projection = scale(this.projection, zoom)
  }

  public rotate(radian: number): void {
    const { rotate } = Matrix
    const delta = radian - this.rotation
    this.projection = rotate(this.projection, delta)
  }

  public get position(): Vector {
    const { subtract, scale } = Vector
    const { tx: x, ty: y } = this.projection
    return subtract(scale(this.dimensions, 0.5), { x, y })
  }

  public get dimensions(): Vector {
    const { offsetWidth: x, offsetHeight: y} = this._element
    return { x, y }
  }

  public get zoom() {
    const { get } = Matrix
    const { x: xScale, y: yScale } = get.scale(this.projection)
    return (xScale + yScale) / 2
  }

  public get rotation() {
    const { get } = Matrix
    return get.rotation(this.projection)
  }
}

export default Camera