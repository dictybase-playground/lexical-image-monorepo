import { describe, test, expect, beforeEach } from "vitest"
import {
  LexicalEditor,
  $getRoot,
  createEditor,
  NodeKey,
  $getNodeByKey,
} from "lexical"
import {
  TableNode,
  TableRowNode,
  TableCellNode,
  $createTableNodeWithDimensions,
} from "@lexical/table"
import { deleteTable, insertRow } from "./tableActions"

const testConfig = {
  namespace: "testEditor",
  theme: {},
}

let testEditor: LexicalEditor
let tableNode: TableNode
let tableNodeKey: NodeKey
let targetTableCell: TableCellNode

beforeEach(() => {
  testEditor = createEditor({
    ...testConfig,
    nodes: [TableNode, TableRowNode, TableCellNode],
  })
  testEditor.update(() => {
    tableNode = $createTableNodeWithDimensions(5, 5)
    tableNodeKey = tableNode.getKey()
    $getRoot().append(tableNode)
    targetTableCell = tableNode.getFirstChild()?.getFirstChild()
  })
})

describe("deleteTable", () => {
  let isTableAttached: boolean | undefined
  test("Given a TableCellNode, the function will remove the given cell from the table", () => {
    testEditor.getEditorState().read(() => {
      isTableAttached = tableNode.isAttached()
    })
    expect(isTableAttached).toBeDefined()
    expect(isTableAttached).toBeTruthy()

    deleteTable(testEditor, targetTableCell)

    testEditor.update(() => {
      isTableAttached = tableNode.isAttached()
    })
    expect(isTableAttached).toBeDefined()
    expect(isTableAttached).toBeFalsy()
  })
})

describe("insertRow", () => {
  test("if insertAfter is true, the function will create a new row below the given table cell's row", () => {
    let initialRowCount
    let finalRowCount

    testEditor.getEditorState().read(() => {
      initialRowCount = tableNode.getChildrenSize()
    })
    insertRow(testEditor, targetTableCell, { insertAfter: true })
    testEditor.update(() => {
      finalRowCount = $getNodeByKey(tableNodeKey).getChildrenSize()
    })

    expect(finalRowCount).toEqual(initialRowCount + 1)
  })
})
