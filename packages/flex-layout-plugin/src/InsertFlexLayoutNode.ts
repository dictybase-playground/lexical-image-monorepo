import { $getSelection } from "lexical"
import { $createFlexLayoutNode } from "./FlexLayoutNode"

const getImmediateRootDescendantFromSelection = () => {
  const selection = $getSelection()
  let node = selection?.getNodes()[0]
  while (node && node.getParent()?.getType() !== "root") {
    node = node.getParentOrThrow()
  }
  return node
}

const InsertFlexLayoutNode = () => {
  const selectedNode = getImmediateRootDescendantFromSelection()
  if (!selectedNode) return false
  const flexLayoutNode = $createFlexLayoutNode()
  selectedNode.insertAfter(flexLayoutNode)
  const paragraphNode = flexLayoutNode.getParagraphNodeOrThrow()
  if (!paragraphNode) return false
  paragraphNode.select()
  return true
}

export default InsertFlexLayoutNode
