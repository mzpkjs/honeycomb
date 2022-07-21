import Vector from "./vector"

type Matrix = {
  a: number
  b: number
  c: number
  d: number
  tx: number
  ty: number
}

export const get = {
  scale(mA: Matrix): Vector {
    const x = Math.sqrt(mA.a ** 2 + mA.c ** 2),
      y = Math.sqrt(mA.b ** 2 + mA.d ** 2)
    return { x, y }
  },
  rotation(mA: Matrix): number {
    return (Math.PI * 1.5 + Math.atan2(mA.d, mA.c)) % (Math.PI * 2)
  }
}

export const create = (a: number = 0, b: number = 0, c: number = 0, d: number = 0, tx: number = 0, ty: number = 0): Matrix => {
  return { a, b, c, d, tx, ty }
}

export const identity = (): Matrix => {
  return create(1, 0, 0, 1, 0, 0)
}

export const rotate = (mA: Matrix, radian: number, mT: Matrix = create()): Matrix => {
  mT.a = mA.a * Math.cos(radian) + mA.c * Math.sin(radian)
  mT.b = mA.b * Math.cos(radian) + mA.d * Math.sin(radian)
  mT.c = mA.a * -Math.sin(radian) + mA.c * Math.cos(radian)
  mT.d = mA.b * -Math.sin(radian) + mA.d * Math.cos(radian)
  mT.tx = mA.tx
  mT.ty = mA.ty
  return mT
}

const Matrix = {
  get,
  create,
  identity,
  rotate
}

export default Matrix