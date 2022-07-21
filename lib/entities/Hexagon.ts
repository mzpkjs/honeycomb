import Entity from "../core/Entity"
import HexagonShape from "../shapes/HexagonShape"
import Vector from "../utilities/vector"

class Hexagon implements Entity, Vector {
  public readonly shape = () =>
    HexagonShape(this)

  public x: number
  public y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

export default Hexagon