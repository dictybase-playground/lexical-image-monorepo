import {
  $getSelection,
  $isNodeSelection,
  $getNearestNodeFromDOMNode,
  $createRangeSelection,
  TextNode,
} from "lexical"
import { $isImageNode } from "./ImageNode"

export const getImageNodeFromElement = (element: HTMLElement | Node) => {
  console.log("element", element)
  const imageNode = $getNearestNodeFromDOMNode(element)
  console.log(imageNode)
  if (!imageNode) return null
  return $isImageNode(imageNode) ? imageNode : null
}

export const getImageNodeFromSelection = () => {
  const selection = $getSelection()
  if (!$isNodeSelection(selection)) return null
  const nodes = selection.getNodes()
  return $isImageNode(nodes[0]) ? nodes[0] : null
}

export const getRangeSelectionFromPoint = (x: number, y: number) => {
  const rangeSelection = $createRangeSelection()
  // @ts-ignore
  if (document.caretPositionFromPoint) {
    // @ts-ignore
    const caretPosition = document.caretPositionFromPoint(x, y)
    const offsetNode = $getNearestNodeFromDOMNode(caretPosition.offsetNode)
    if (!offsetNode || !(offsetNode instanceof TextNode)) return null
    if (!caretPosition) return null

    rangeSelection.setTextNodeRange(
      offsetNode,
      caretPosition.offset,
      offsetNode,
      caretPosition.offset,
    )
  }

  if (document.caretRangeFromPoint) {
    const range = document.caretRangeFromPoint(x, y)
    if (!range) return null
    rangeSelection.applyDOMRange(range)
  }

  return rangeSelection
}
