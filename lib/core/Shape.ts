class Shape {
  private readonly _tag: string
  private readonly _children: (Shape | string)[] = []
  private readonly _attributes: Map<string, string> = new Map()

  constructor(tag: string) {
    this._tag = tag
  }

  public setAttribute(attribute: string, value: string): void {
    this._attributes.set(attribute, value)
  }

  public append(child: Shape | string): void {
    this._children.push(child)
  }

  public get tagName() {
    return this._tag
  }

  public get attributes() {
    return this._attributes
  }

  public get children() {
    return this._children
  }
}

export const h = (tag: string, attributes: Record<string, string | number> | null, ...children: (Shape | string)[]): Shape => {
  const shape = new Shape(tag)

  if (attributes !== null) {
    for (const attribute in attributes) {
      if (attributes.hasOwnProperty(attribute)) {
        const value = attributes[attribute]
        shape.setAttribute(attribute, String(value))
      }
    }
  }

  for (const child of children) {
    shape.append(child)
  }

  return shape
}

export const g = (attributes: { }, ...children: Shape[]) =>
  h("g", attributes, ...children)

export const text = (attributes: { x?: number, y?: number, fill?: string, "text-anchor"?: string, "dominant-baseline"?: string, transform?: string, "transform-origin"?: string }, ...children: string[]) =>
  h("text", attributes, ...children)

export const polygon = (attributes: { points?: string, fill?: string }) =>
  h("polygon", attributes)

export default Shape