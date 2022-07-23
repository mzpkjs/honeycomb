type Vector = {
  x: number
  y: number
}

const get = {

}

export const create = (x: number = 0, y: number = 0): Vector => {
  return { x, y }
}

export const add = (vA: Vector, vB: Vector, vT = create()): Vector => {
  vT.x = vA.x + vB.x
  vT.y = vA.y + vB.y
  return vT
}

export const subtract = (vA: Vector, vB: Vector, vT = create()): Vector => {
  vT.x = vA.x - vB.x
  vT.y = vA.y - vB.y
  return vT
}

export const multiply = (vA: Vector, vB: Vector, vT = create()): Vector => {
  vT.x = vA.x * vB.x
  vT.y = vA.y * vB.y
  return vT
}

export const divide = (vA: Vector, vB: Vector, vT = create()): Vector => {
  vT.x = vA.x / vB.x
  vT.y = vA.y / vB.y
  return vT
}

export const scale = (vA: Vector, scalar: number, vT = create()): Vector => {
  vT.x = vA.x * scalar
  vT.y = vA.y * scalar
  return vT
}


const Vector = {
  get,
  create,
  add,
  subtract,
  multiply,
  scale
}

export default Vector