import {
  EditorConfig,
  $createParagraphNode,
  LexicalNode,
  DecoratorNode,
} from "lexical"

class FlexLayoutNode extends DecoratorNode<JSX.Element> {
  static getType() {
    return "flex-layout"
  }

  static clone(node: FlexLayoutNode) {
    const { key } = node
    return new FlexLayoutNode(key)
  }

  canBeEmpty() {
    return false
  }

  updateDOM() {
    return false
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
  node.getType() === "flex-layout"

export const $createFlexLayoutNode = () => {
  const paragraphNode = $createParagraphNode()
  const flexLayoutNode = new FlexLayoutNode()
  flexLayoutNode.append(paragraphNode)
  return flexLayoutNode
}

export default FlexLayoutNode
