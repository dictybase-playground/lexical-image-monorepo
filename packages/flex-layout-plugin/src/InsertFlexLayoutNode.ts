import {
  LexicalNode,
  TextNode,
  RangeSelection,
  $isRootNode,
  $getSelection,
  $isRangeSelection,
} from "lexical"
import { $createFlexLayoutNode } from "./FlexLayoutNode"

const getImmediateRootDescendantFromLexicalNode = (
  node: LexicalNode,
): LexicalNode => {
  const nodeParent = node.getParent()
  if (!nodeParent) throw new Error("Node is not a descendant of a root node")
  if ($isRootNode(nodeParent)) return node
  return getImmediateRootDescendantFromLexicalNode(nodeParent)
}

const getImmediateRootDescendantFromRangeSelection = (
  selection: RangeSelection,
) => {
  const node = selection.getNodes()[0]
  return node ? getImmediateRootDescendantFromLexicalNode(node) : null
}

const getSelectionPoints = (range: RangeSelection) => {
  const start = range.isBackward() ? range.focus : range.anchor
  const end = range.isBackward() ? range.anchor : range.focus
  return {
    points: [start.offset, end.offset],
    startNode: start.getNode(),
    endNode: end.getNode(),
  }
}

const splitText = (text: string, start: number, end: number) => [
  text.slice(0, start),
  text.slice(end),
]

const InsertFlexLayoutNode = () => {
  const selection = $getSelection()
  if (!selection || !$isRangeSelection(selection)) return false
  const selectedNode = getImmediateRootDescendantFromRangeSelection(selection)
  if (!selectedNode) return false
  const flexLayoutNode = $createFlexLayoutNode()

  const {
    points: [start, end],
    startNode,
  } = getSelectionPoints(selection)

  if (start === 0 || end === 0) {
    selectedNode.insertBefore(flexLayoutNode)
  } else {
    selectedNode.insertAfter(flexLayoutNode)

    const paragraphNode = flexLayoutNode.getParagraphNodeOrThrow()
    if (!paragraphNode) return false
    paragraphNode.select()

    const [textToRemain, textToMove] = splitText(
      selectedNode.getTextContent(),
      start,
      end,
    )
    if (textToMove) {
      paragraphNode.append(new TextNode(textToMove))
      startNode.setTextContent(textToRemain)
    }
  }
  return true
}

export default InsertFlexLayoutNode
