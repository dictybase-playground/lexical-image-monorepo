import {
  EditorConfig,
  ElementNode,
  LexicalNode,
  $createParagraphNode,
  $isParagraphNode,
  ParagraphNode,
} from "lexical"

const nodeTypeName = "flex-layout"

class FlexLayoutNode extends ElementNode {
  static getType() {
    return nodeTypeName
  }

  static clone(node: FlexLayoutNode) {
    const { __key } = node
    return new FlexLayoutNode(__key)
  }

  canBeEmpty() {
    return false
  }

  static importJSON() {
    return new FlexLayoutNode()
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: nodeTypeName,
    }
  }

  updateDOM() {
    return false
  }

  getParagraphNodeOrThrow() {
    const paragraphNode = this.getChildren().find((node) =>
      $isParagraphNode(node),
    )
    if (!paragraphNode) throw new Error("FlexLayoutNode has no ParagraphNode")
    return paragraphNode as ParagraphNode
  }

  createDOM(config: EditorConfig) {
    const div = document.createElement("div")
    div.style.display = "flex"
    // div.style.justifyContent = "center"
    const { theme } = config
    const className = theme.flexLayout
    if (className) {
      div.className = className
    }
    return div
  }
}

export const $isFlexLayoutNode = (node: LexicalNode): node is FlexLayoutNode =>
  node.getType() === nodeTypeName

export const $createFlexLayoutNode = () => {
  const paragraphNode = $createParagraphNode()
  const flexLayoutNode = new FlexLayoutNode()
  flexLayoutNode.append(paragraphNode)
  return flexLayoutNode
}

export default FlexLayoutNode
