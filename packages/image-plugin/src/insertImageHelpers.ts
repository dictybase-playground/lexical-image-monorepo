import {
  $getSelection,
  $isParagraphNode,
  LexicalEditor,
  LexicalNode,
} from "lexical"

const getDifference = (first: number, second: number) =>
  Math.abs(first - second)

const getFirstRangeFromSelection = (selection: Selection) =>
  selection.getRangeAt(0)

const getXCoordinateFromRange = (range: Range) =>
  range.getBoundingClientRect().x

const getXCoordinateFromDOMSelection = () => {
  const selection = window.getSelection()
  if (!selection) return 0
  return getXCoordinateFromRange(getFirstRangeFromSelection(selection))
}

const shouldInsertLeft = (left: number, right: number) => {
  const insertionXCoordinate = getXCoordinateFromDOMSelection()
  return (
    getDifference(insertionXCoordinate, left) <
    getDifference(insertionXCoordinate, right)
  )
}

const getElementFromLexicalNode = (editor: LexicalEditor, node: LexicalNode) =>
  editor.getElementByKey(node.getKey())

const getParagraphFromSelection = () => {
  const selection = $getSelection()
  const anchorNode = selection?.getNodes()[0]
  const paragraphNode = anchorNode?.getParentOrThrow()
  return $isParagraphNode(paragraphNode) ? paragraphNode : null
}

const insertNodeIntoFlexRow = (editor: LexicalEditor, node: LexicalNode) => {
  const targetParagraph = getParagraphFromSelection()
  if (!targetParagraph) return
  const paragraphElement = getElementFromLexicalNode(editor, targetParagraph)
  if (!paragraphElement) return
  const { left, right } = paragraphElement.getBoundingClientRect()
  if (shouldInsertLeft(left, right)) {
    const firstItem = targetParagraph.getFirstChildOrThrow()
    firstItem.insertBefore(node)
  } else {
    const lastItem = targetParagraph.getLastChildOrThrow()
    lastItem.insertAfter(node)
  }
}

export default insertNodeIntoFlexRow
