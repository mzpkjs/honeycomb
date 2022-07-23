import Shape, { g, polygon, text } from "../core/Shape";
import Camera from "../core/Camera";
import Hexagon from "../entities/Hexagon"

const HexagonShape = (hexagon: Hexagon, camera: Camera): Shape => {
  const radius = 25,
    width = Math.sqrt(3) * radius,
    height = 2 * radius
  const x = (hexagon.x + hexagon.y % 2 / 2) * width,
    y = hexagon.y * height * 0.75

  const points = []
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 - 30) * Math.PI / 180
    points.push(
      [
        x + radius * Math.cos(angle),
        y + radius * Math.sin(angle)
      ]
    )
  }


  return (
    g({},
      polygon({
        points:
          points.map(point =>
            point.join(",")
          ).join(" "),
        fill: `rgb(${hexagon.x * hexagon.y}, ${hexagon.x * hexagon.y}, ${hexagon.x * hexagon.y})`
      }),
      text({ x, y, fill: "white", "text-anchor": "middle", "dominant-baseline": "middle",
        "transform": `rotate(${-camera.rotation * (180/Math.PI)})`, "transform-origin": `${x} ${y}`
      }, `${hexagon.x}, ${hexagon.y}`)
    )
  )
}

export default HexagonShape