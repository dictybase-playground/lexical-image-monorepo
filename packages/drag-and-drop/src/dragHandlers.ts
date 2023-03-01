import {
  $getNearestNodeFromDOMNode,
  $createRangeSelection,
  $setSelection,
  LexicalEditor,
  $insertNodes,
} from "lexical"

// On Firefox, when the image is dragged, a transparent version of the image hovers
// with the user's cursor. This can make it difficult to see where the image is
// being moved precisely. The drag image can be replaced with transparent image
// below
const TRANSPARENT_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
const img = document.createElement("img")
img.src = TRANSPARENT_IMAGE

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

export const onDragEnd = (event: DragEvent, editor: LexicalEditor) => {
  event.preventDefault()
  if (!(event.target instanceof HTMLElement)) return false

  const node = $getNearestNodeFromDOMNode(event.target)
  if (!node) return false

  $setSelection(getRangeSelectionFromPoint(event.clientX, event.clientY))

  editor.update(() => {
    $insertNodes([node])
  })
  return true
}
