import Hexagon from "../entities/Hexagon"
import Shape, { g, polygon } from "../core/Shape"

const HexagonShape = (hexagon: Hexagon): Shape => {
  const radius = 25,
    width = Math.sqrt(3) * radius,
    height = 2 * radius

  const points = []
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 - 30) * Math.PI / 180
    points.push(
      [
        (hexagon.x + hexagon.y % 2 / 2) * width + radius * Math.cos(angle),
        hexagon.y * height * 0.75 + radius * Math.sin(angle)
      ]
    )
  }


  return (
    g(null,
      polygon({
        points:
          points.map(point =>
            point.join(",")
          ).join(" "),
        fill: `rgb(${hexagon.x * hexagon.y}, ${hexagon.x * hexagon.y}, ${hexagon.x * hexagon.y})`
      })
    )
  )
}

export default HexagonShape