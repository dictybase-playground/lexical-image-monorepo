import { $getSelection, $isRangeSelection } from "lexical"
import { $createFlexLayoutDecoratorNode } from "./FlexLayoutDecoratorNode"
import {
  getImmediateRootDescendantFromRangeSelection,
  getSelectionPoints,
} from "./helpers"

const InsertFlexDecoratorNode = () => {
  const selection = $getSelection()
  if (!selection || !$isRangeSelection(selection)) return false
  const selectedNode = getImmediateRootDescendantFromRangeSelection(selection)
  if (!selectedNode) return false
  const flexLayoutNode = $createFlexLayoutDecoratorNode()

  const {
    points: [offsetStart, offsetEnd],
  } = getSelectionPoints(selection)

  if (offsetStart === 0 || offsetEnd === 0) {
    selectedNode.insertBefore(flexLayoutNode)
  } else {
    selectedNode.insertAfter(flexLayoutNode)
  }
  return true
}

export default InsertFlexDecoratorNode
