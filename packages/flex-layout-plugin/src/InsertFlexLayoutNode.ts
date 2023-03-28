import { TextNode, $getSelection, $isRangeSelection } from "lexical"
import { $createFlexLayoutNode } from "./FlexLayoutNode"
import {
  getImmediateRootDescendantFromRangeSelection,
  getSelectionPoints,
  getTextEdges,
} from "./helpers"

const InsertFlexLayoutNode = () => {
  const selection = $getSelection()
  if (!selection || !$isRangeSelection(selection)) return false
  const selectedNode = getImmediateRootDescendantFromRangeSelection(selection)
  if (!selectedNode) return false

  const flexLayoutNode = $createFlexLayoutNode()

  const {
    points: [offsetStart, offsetEnd],
    startNode,
  } = getSelectionPoints(selection)

  if (offsetStart === 0 || offsetEnd === 0) {
    selectedNode.insertBefore(flexLayoutNode)
  } else {
    selectedNode.insertAfter(flexLayoutNode)

    const paragraphNode = flexLayoutNode.getParagraphNodeOrThrow()
    if (!paragraphNode) return false
    paragraphNode.select()

    const [textToRemain, textToMove] = getTextEdges(
      selectedNode.getTextContent(),
      offsetStart,
      offsetEnd,
    )
    if (textToMove) {
      paragraphNode.append(new TextNode(textToMove))
      startNode.setTextContent(textToRemain)
    }
  }
  return true
}

export default InsertFlexLayoutNode
