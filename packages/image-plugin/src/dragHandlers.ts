import {
  $getSelection,
  $isNodeSelection,
  $getNearestNodeFromDOMNode,
} from "lexical"
import { $isImageNode } from "./ImageNode"
// On Firefox, when the image is dragged, a transparent version of the image hovers
// with the user's cursor. This can make it difficult to see where the image is
// being moved precisely. The drag image can be replaced with transparent image
// below
const TRANSPARENT_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
const img = document.createElement("img")
img.src = TRANSPARENT_IMAGE

const getImageNodeFromSelection = () => {
  const selection = $getSelection()
  if (!$isNodeSelection(selection)) return null
  const nodes = selection.getNodes()
  return $isImageNode(nodes[0]) ? nodes[0] : null
}

const getCursorDistanceFromElementY = (clientY: number, ElementY: number) =>
  Math.abs(clientY - ElementY)

const shouldInsertAfter = (clientY: number, top: number, bottom: number) =>
  getCursorDistanceFromElementY(clientY, top) >
  getCursorDistanceFromElementY(clientY, bottom)

export const onDragStart = (event: DragEvent) => {
  event.dataTransfer?.setDragImage(img, 0, 0)
  return true
}

export const onDrop = (event: DragEvent) => {
  event.preventDefault()
  if (!(event.target instanceof Node) || !(event.target instanceof HTMLElement))
    return false

  const dropTargetNode = $getNearestNodeFromDOMNode(event.target)
  if (!dropTargetNode) return false

  const imageNode = getImageNodeFromSelection()
  if (!imageNode) return false

  const { top, bottom } = event.target.getBoundingClientRect()

  if (shouldInsertAfter(event.clientY, top, bottom)) {
    dropTargetNode.insertAfter(imageNode)
  } else {
    dropTargetNode.insertBefore(imageNode)
  }

  return true
}
