import {
  LexicalNode,
  $isRootNode,
  TextNode,
  ParagraphNode,
  RangeSelection,
  NodeSelection,
  GridSelection,
} from "lexical"
import { PointType } from "lexical/LexicalSelection"

/**
 * Retrieves the immediate root descendant from a given lexical node by recursively traversing up the lexical hierarchy until a root node is found. Throws an error if the node is not a descendant of a root node.
 * @param node - The lexical node to find the immediate root descendant of.
 * @throws An error is thrown if the given node is not a descendant of a root node.
 * @returns The immediate root descendant of the given lexical node.
 */
const getImmediateRootDescendantFromLexicalNode = (
  node: LexicalNode,
): LexicalNode => {
  const nodeParent = node.getParent()
  if (!nodeParent) throw new Error("Node is not a descendant of a root node")
  if ($isRootNode(nodeParent)) return node
  return getImmediateRootDescendantFromLexicalNode(nodeParent)
}

/**
 * Retrieves the immediate root descendant from the first node in a given selection.
 * @param selection - The selection whose first node should be used to find its immediate root descendant.
 * @returns The immediate root descendant of the first node in the given selection, or null if the selection has no nodes.
 */
export const getImmediateRootDescendant = (
  selection: RangeSelection | NodeSelection | GridSelection,
) => {
  const node = selection.getNodes()[0]
  return node ? getImmediateRootDescendantFromLexicalNode(node) : null
}

export const getNodeAtCaret = (selection: RangeSelection) => {
  if (!selection.isCollapsed()) return null
  return selection.focus
}

/**
 * Retrieves an array containing two strings representing the substrings of a larger string split at a given offset.
 * @param nodeText - The larger string to split into substrings.
 * @param offset - The index within nodeText at which to perform the split.
 * @returns An array containing two strings. The first represents nodeText up to the split point, and the second represents nodeText after the split point.
 */
const getTextEdges = (nodeText: string, offset: number) => [
  nodeText.slice(0, offset),
  nodeText.slice(offset),
]

/**
 * Handles the text content of a given node by moving a specified portion of its text content to a new paragraph node.
 * @param nodeWithText - The point type that represents the lexical node and offset at which to split the text content.
 * @param paragraphNode - The paragraph node to append the new text node to.
 */
export const handleTextContent = (
  nodeWithText: PointType,
  paragraphNode: ParagraphNode,
) => {
  const [textToRemain, textToMove] = getTextEdges(
    nodeWithText.getNode().getTextContent(),
    nodeWithText.offset,
  )
  nodeWithText.getNode().setTextContent(textToRemain)
  paragraphNode.append(new TextNode(textToMove))
}
