import { LexicalEditor } from "lexical"
import {
  TableCellNode,
  $getTableNodeFromLexicalNodeOrThrow,
  $getTableRowIndexFromTableCellNode,
  $getTableColumnIndexFromTableCellNode,
  $getElementGridForTableNode,
  $insertTableRow,
  $insertTableColumn,
} from "@lexical/table"

export const deleteTable = (
  editor: LexicalEditor,
  tableCellNode: TableCellNode | null,
) => {
  if (!tableCellNode) return
  editor.update(() => {
    const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
    tableNode.remove()
  })
}

export const insertRow = (
  editor: LexicalEditor,
  tableCellNode: TableCellNode | null,
  { insertAfter }: { insertAfter: boolean },
) => {
  if (!tableCellNode) return
  editor.update(() => {
    const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
    const row = $getTableRowIndexFromTableCellNode(tableCellNode)
    const grid = $getElementGridForTableNode(editor, tableNode)
    $insertTableRow(tableNode, row, insertAfter, 1, grid)
  })
}
export const insertColumn = (
  editor: LexicalEditor,
  tableCellNode: TableCellNode | null,
  { insertAfter }: { insertAfter: boolean },
) => {
  if (!tableCellNode) return
  editor.update(() => {
    const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
    const column = $getTableColumnIndexFromTableCellNode(tableCellNode)
    const grid = $getElementGridForTableNode(editor, tableNode)
    $insertTableColumn(tableNode, column, insertAfter, 1, grid)
  })
}
