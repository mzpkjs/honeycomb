import Entity from "../core/Entity"
import HexagonShape from "../shapes/HexagonShape"
import Vector from "../utilities/vector"
import Camera from "../core/Camera"

class Hexagon implements Entity, Vector {
  public readonly shape = (camera: Camera) =>
    HexagonShape(this, camera)

  public x: number
  public y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

export default Hexagon