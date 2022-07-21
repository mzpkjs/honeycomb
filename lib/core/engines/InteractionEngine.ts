import Camera from "../Camera"
import Vector, { add, subtract, scale } from "../../utilities/vector"

enum ModifierKey {
  SHIFT_LEFT = "ShiftLeft"
}

type EngineState = {
  isActive: boolean
  origin: Vector
  current: Vector
  keys: Set<ModifierKey>
}

class InteractionEngine {
  private readonly _element: HTMLElement
  private readonly _camera: Camera
  private readonly _state: EngineState = {
    isActive: false,
    origin: {  x: 0, y: 0 },
    current: {  x: 0, y: 0 },
    keys: new Set()
  }

  constructor(element: HTMLElement, camera: Camera) {
    this._element = element
    this._camera = camera
    this._element.addEventListener("mousedown", this._mousedown)
    this._element.addEventListener("mouseup", this._mouseup)
    this._element.addEventListener("mousemove", this._mousemove)
    this._element.addEventListener("wheel", this._wheel)
    window.addEventListener("keydown", this._keydown)
    window.addEventListener("keyup", this._keyup)
    this._state.current = this._camera.position
  }

  public destroy() {
    this._element.removeEventListener("mousedown", this._mousedown)
    this._element.removeEventListener("mouseup", this._mouseup)
    this._element.removeEventListener("mousemove", this._mousemove)
    this._element.removeEventListener("wheel", this._wheel)
    window.removeEventListener("keydown", this._keydown)
    window.removeEventListener("keyup", this._keyup)
  }

  public update() {
    return void 0
  }

  private _mousedown = (event: MouseEvent) => {
    this._state.isActive = true
    this._state.current = this._camera.position
    this._state.origin = offset({ x: event.clientX, y: event.clientY }, this._camera)
  }

  private _mouseup = (event: MouseEvent) => {
    this._state.isActive = false
  }

  private _mousemove = (event: MouseEvent) => {
    if (this._state.isActive) {
      const target = offset({ x: event.clientX, y: event.clientY }, this._camera)
      if (this._state.keys.size === 0) {
        const { x, y } = add(scale(this._state.current, -1), subtract(target, this._state.origin))
        this._camera.set({ x, y })
      } else if (this._state.keys.has(ModifierKey.SHIFT_LEFT)) {
        const multiplier = 0.00025
        const delta = multiplier * event.movementX * Math.PI * 2
        this._camera.rotate(delta)
      }
    }
  }

  private _wheel = (event: WheelEvent) => {
    if (this._state.keys.size === 0) {
      const multiplier = 0.001
      const zoom = this._camera.zoom - event.deltaY * multiplier
      if (zoom > Camera.ZOOM_MINIMUM && zoom < Camera.ZOOM_MAXIMUM) {
        const target = offset({ x: event.clientX, y: event.clientY }, this._camera)
        const { x, y } = subtract(
          scale(this._camera.position, -1),
          scale(target, 1 - this._camera.zoom / zoom)
        )
        this._camera.set({ x, y, z: zoom })
      } else {
        this._camera.set({ z: zoom })
      }
    } else if (this._state.keys.has(ModifierKey.SHIFT_LEFT)) {
      const multiplier = 0.00025
      const delta = multiplier * event.deltaY * Math.PI * 2
      this._camera.rotate(delta)
    }
  }

  private _keydown = (event: KeyboardEvent) => {
    this._state.keys.add(ModifierKey.SHIFT_LEFT)
  }

  private _keyup = (event: KeyboardEvent) => {
    this._state.keys.delete(ModifierKey.SHIFT_LEFT)
  }
}

const offset = (vA: Vector, camera: Camera) => {
  return subtract(vA, scale(camera.dimensions, 0.5))
}

export default InteractionEngine