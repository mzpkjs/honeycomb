import Shape from "./Shape"
import Camera from "./Camera"

interface Entity {
  shape: (camera: Camera) => Shape
}

export default Entity