import {
  $getSelection,
  $isNodeSelection,
  $getNearestNodeFromDOMNode,
  $createRangeSelection,
  $setSelection,
  LexicalEditor,
  $insertNodes,
} from "lexical"
import { $isImageNode } from "./ImageNode"
import { INSERT_IMAGE_COMMAND } from "./ImagePlugin"
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

const getRangeSelectionFromPoint = (x: number, y: number) => {
  const rangeSelection = $createRangeSelection()

  if (document.caretPositionFromPoint) {
    const caretPosition = document.caretPositionFromPoint(x, y)
    if (!caretPosition) return rangeSelection
    rangeSelection.setTextNodeRange(
      $getNearestNodeFromDOMNode(caretPosition.offsetNode),
      caretPosition.offset,
      $getNearestNodeFromDOMNode(caretPosition.offsetNode),
      caretPosition.offset,
    )
  } else if (document.caretRangeFromPoint) {
    const range = document.caretRangeFromPoint(x, y)
    if (!range) return rangeSelection
    rangeSelection.applyDOMRange(range)
  }

  return rangeSelection
}

export const onDragStart = (event: DragEvent) => {
  event.dataTransfer?.setDragImage(img, 0, 0)
  return true
}

export const onDrop = (event: DragEvent, editor: LexicalEditor) => {
  event.preventDefault()
  if (!(event.target instanceof Node) || !(event.target instanceof HTMLElement))
    return false

  const imageNode = getImageNodeFromSelection()
  if (!imageNode) return false

  $setSelection(getRangeSelectionFromPoint(event.clientX, event.clientY))
  console.log(getRangeSelectionFromPoint(event.clientX, event.clientY))
  editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
    source: imageNode.source,
    width: imageNode.width,
    height: imageNode.height,
    key: imageNode.getKey(),
  })
  return true
}
