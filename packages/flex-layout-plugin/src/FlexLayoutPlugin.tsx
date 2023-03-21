import { useEffect } from "react"
import {
  $getSelection,
  KEY_ENTER_COMMAND,
  COMMAND_PRIORITY_HIGH,
} from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $createFlexLayoutNode, $isFlexLayoutNode } from "./FlexLayoutNode"

const getFlexLayoutFromSelection = () => {
  const selection = $getSelection()
  let node = selection?.getNodes()[0]
  while (node && node.getType() !== "root") {
    if ($isFlexLayoutNode(node)) return node
    node = node.getParentOrThrow()
  }
  return null
}

const FlexLayoutPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const unregisterKeyEnter = editor.registerCommand(
      KEY_ENTER_COMMAND,
      () => {
        const currentFlexLayoutNode = getFlexLayoutFromSelection()
        if (!currentFlexLayoutNode) return false
        currentFlexLayoutNode.insertAfter($createFlexLayoutNode())
        return true
      },
      COMMAND_PRIORITY_HIGH,
    )

    return () => {
      unregisterKeyEnter()
    }
  })

  return null
}

export default FlexLayoutPlugin
