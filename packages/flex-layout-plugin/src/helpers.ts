import { LexicalNode, RangeSelection, $isRootNode } from "lexical"

const getImmediateRootDescendantFromLexicalNode = (
  node: LexicalNode,
): LexicalNode => {
  const nodeParent = node.getParent()
  if (!nodeParent) throw new Error("Node is not a descendant of a root node")
  if ($isRootNode(nodeParent)) return node
  return getImmediateRootDescendantFromLexicalNode(nodeParent)
}

export const getImmediateRootDescendantFromRangeSelection = (
  selection: RangeSelection,
) => {
  const node = selection.getNodes()[0]
  return node ? getImmediateRootDescendantFromLexicalNode(node) : null
}

export const getSelectionPoints = (range: RangeSelection) => {
  const start = range.isBackward() ? range.focus : range.anchor
  const end = range.isBackward() ? range.anchor : range.focus
  return {
    points: [start.offset, end.offset],
    startNode: start.getNode(),
    endNode: end.getNode(),
  }
}

export const getTextEdges = (
  text: string,
  offsetStart: number,
  offsetEnd: number,
) => [text.slice(0, offsetStart), text.slice(offsetEnd)]
