import { useEffect } from "react"
import {
  createCommand,
  COMMAND_PRIORITY_EDITOR,
  $insertNodes,
  DRAGSTART_COMMAND,
  COMMAND_PRIORITY_HIGH,
  DROP_COMMAND,
} from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import ImageNode from "./ImageNode"
import { onDragStart, onDrop } from "./dragHandlers"

type InsertImagePayload = {
  source: string
  alt?: string
  width: number
  height: number
  key?: string
}

export const INSERT_IMAGE_COMMAND = createCommand<InsertImagePayload>()

const ImagePlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor")
    }

    const unregisterInsertImage = editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload: InsertImagePayload) => {
        const imageNode = new ImageNode(payload)
        $insertNodes([imageNode])
        return true
      },
      COMMAND_PRIORITY_EDITOR,
    )

    const unregisterDragStart = editor.registerCommand(
      DRAGSTART_COMMAND,
      onDragStart,
      COMMAND_PRIORITY_HIGH,
    )

    const unregisterDrop = editor.registerCommand(
      DROP_COMMAND,
      (event) => onDrop(event, editor),
      COMMAND_PRIORITY_HIGH,
    )

    return () => {
      unregisterInsertImage()
      unregisterDragStart()
      unregisterDrop()
    }
  })

  return null
}

export default ImagePlugin
