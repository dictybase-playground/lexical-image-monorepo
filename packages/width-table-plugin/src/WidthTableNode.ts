import { TableNode, SerializedTableNode } from "@lexical/table"
import { addClassNamesToElement } from "@lexical/utils"
import { NodeKey, EditorConfig } from "lexical"

export interface SerializedWidthTableNode extends SerializedTableNode {
  width: number
}
// @ts-ignore
class WidthTableNode extends TableNode {
  static getType() {
    return "table"
  }

  static clone(node: WidthTableNode): WidthTableNode {
    return new WidthTableNode(node.__width, node.__key)
  }

  static importJSON(__serializedNode: SerializedWidthTableNode) {
    return new WidthTableNode(__serializedNode.width)
  }

  constructor(width: number, key?: NodeKey) {
    super(key)
    /*
    Note about double underscore naming from Lexical's documentation:

    "By convention, we prefix properties with __ (double underscore) so that it makes it clear that these
    properties are private and their access should be avoided directly. We opted for __ instead of _
    because of the fact that some build tooling mangles and minifies single _ prefixed properties to improve
    code size. However, this breaks down if you're exposing a node to be extended outside of your build."
    https://lexical.dev/docs/concepts/nodes#node-properties
    */
    this.__width = width
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      width: this.__width,
    }
  }

  createDOM(config: EditorConfig) {
    const tableElement = document.createElement("table")
    addClassNamesToElement(tableElement, config.theme.table)
    tableElement.style.width = `${this.__width}px`
    return tableElement
  }
}

export default WidthTableNode
