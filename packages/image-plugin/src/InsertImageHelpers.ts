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

/**
 * We need some way to represent the position of the selection caret
 * in order to determine where to insert a node. The browser Selection
 * itself has no value that we can use, but a Selection may have a number
 * of Range objects that we can get a DOMRect of. We can then use the X
 * value of the DOMRect. Since a Selection may have multiple Ranges, we
 * can simply use the first Range.
 *
 * @returns the x value of the DOMRect of the first range of the selection
 */
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
  let node = selection?.getNodes()[0]
  while (node && node.getType() !== "root") {
    if ($isParagraphNode(node)) return node
    node = node.getParentOrThrow()
  }
  return null
}

/**
 * If the selection caret is closer to the left boundary of the paragraph element,
 * the new node will be inserted as the first child of the paragraph. Otherwise,
 * if the selection caret is closer to the right boundary of the paragraph elmenet,
 * the new node will be inserted as the last child of the paragraph.
 *
 * 1. Get the paragraph node that the selection is currently inside of
 * 2. Get the <p> DOM element that corresponds to that paragraph node
 * 3. Get the X coordinate values of the left and right boundaries of
 *    the paragraph element's bounding box
 * 4. Compares the distance between:
 *     A - the selection caret and the left side of the paragraph element
 *     B - the selection caret and the right side of the paragraph element
 *     if A < B, insert new node as first child
 *     if A > B, insert new node as last child
 * 5. If the new node should be inserted as the first child of the paragraph,
 *    we can accomplish this by getting the current first child of the paragraph and
 *    inserting the new node before the first child.
 * 6. Likewise, if the new node should be inserted as the last child of the paragraph,
 *    we can accomplish this by getting the current last child of the paragraph and
 *    inserting the new node after the last child.
 * 7. If the paragraph node currently empty, i.e. it has no children. We can simply
 *    use the $insertNodes function to insert it into the paragraph.
 *
 * In reality, we are not comparing the X coordinate of the selection caret, but the x value of
 * the DOMRect of the first range of the selection. See getXCoordinateFromDOMSelection for
 * details.
 *
 * @param editor a lexical editor instance
 * @param node the node to be inserted
 * @returns void
 */
const insertNodeIntoFlexRow = (editor: LexicalEditor, node: LexicalNode) => {
  const targetParagraph = getParagraphFromSelection()
  if (!targetParagraph) return
  const paragraphElement = getElementFromLexicalNode(editor, targetParagraph)
  if (!paragraphElement) return
  const { left, right } = paragraphElement.getBoundingClientRect()
  if (shouldInsertLeft(left, right)) {
    targetParagraph.insertBefore(node)
  } else {
    targetParagraph.insertAfter(node)
  }
}

export default insertNodeIntoFlexRow
