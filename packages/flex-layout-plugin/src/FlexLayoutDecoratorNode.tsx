import { LexicalNode, EditorConfig, DecoratorNode, NodeKey } from "lexical"
import FlexLayout from "./FlexLayout"

type FlexLayoutDecoratorNodeConstructorProperties = {
  __key?: NodeKey
  __text?: string
}

class FlexLayoutDecoratorNode extends DecoratorNode<JSX.Element> {
  static getType() {
    return "flex-layout-decorator"
  }

  static clone(node: FlexLayoutDecoratorNode) {
    const { __key, __text } = node
    return new FlexLayoutDecoratorNode({ __key, __text })
  }

  constructor({
    __key,
    __text = "",
  }: FlexLayoutDecoratorNodeConstructorProperties) {
    super(__key)
    this.__text = __text
  }

  setTextContent(text: string) {
    const writable = this.getWritable()
    writable.__text = text
  }

  canBeEmpty() {
    return false
  }

  updateDOM() {
    return false
  }

  createDOM(config: EditorConfig) {
    const div = document.createElement("div")
    const { theme } = config
    const className = theme.flexLayoutDecorator
    if (className) {
      div.className = className
    }
    return div
  }

  decorate() {
    return <FlexLayout nodeKey={this.__key} textContent={this.__text} />
  }
}

export const $isFlexLayoutDecoratorNode = (
  node: LexicalNode,
): node is FlexLayoutDecoratorNode => node.getType() === "flex-layout-decorator"

export const $createFlexLayoutDecoratorNode = () =>
  new FlexLayoutDecoratorNode({})

export default FlexLayoutDecoratorNode
