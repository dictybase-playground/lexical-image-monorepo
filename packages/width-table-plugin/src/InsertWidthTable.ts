import { $getSelection, $isRangeSelection, $createParagraphNode } from "lexical"
import $createWidthTable from "./$createWidthTable"

type InsertWidthTablePayload = {
  columns: number
  rows: number
  width: number
}

const InsertWidthTable = ({
  columns,
  rows,
  width,
}: InsertWidthTablePayload) => {
  const selection = $getSelection()

  if (!$isRangeSelection(selection)) return true

  const { focus } = selection
  const focusNode = focus.getNode()

  if (!focusNode) return true

  const tableNode = $createWidthTable(rows, columns, width)

  const topLevelNode = focusNode.getTopLevelElementOrThrow()
  topLevelNode.insertAfter(tableNode)

  tableNode.insertAfter($createParagraphNode())

  const firstCell = tableNode.getFirstChildOrThrow().getFirstChildOrThrow()
  firstCell.select()

  return true
}

export default InsertWidthTable
