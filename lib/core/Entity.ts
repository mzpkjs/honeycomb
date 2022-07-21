import Shape from "./Shape"

interface Entity {
  shape: () => Shape
}

export default Entity