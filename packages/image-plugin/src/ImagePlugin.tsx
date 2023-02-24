import { useEffect } from "react"
import {
  createCommand,
  COMMAND_PRIORITY_EDITOR,
  $insertNodes,
  $createRangeSelection,
  $getSelection,
  $setSelection,
  $isNodeSelection,
  DRAGSTART_COMMAND,
  COMMAND_PRIORITY_HIGH,
  DROP_COMMAND,
  LexicalEditor,
  $getNearestNodeFromDOMNode,
  $createParagraphNode,
} from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import ImageNode, { $isImageNode } from "./ImageNode"

type InsertImagePayload = {
  source: string
  alt?: string
  width: number
  height: number
  key?: string
}

export const INSERT_IMAGE_COMMAND = createCommand<InsertImagePayload>()

// On Firefox, when the image is dragged, a transparent version of the image hovers
// with the user's cursor. This can make it difficult to see where the image is
// being moved precisely. The drag image can be replaced with transparent image
// below
const TRANSPARENT_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
const img = document.createElement("img")
img.src = TRANSPARENT_IMAGE

export const getImageNodeFromSelection = () => {
  const selection = $getSelection()
  if (!$isNodeSelection(selection)) return null
  const nodes = selection.getNodes()
  return $isImageNode(nodes[0]) ? nodes[0] : null
}

export const onDragStart = (event: DragEvent) => {
  event.dataTransfer?.setDragImage(img, 0, 0)
  return true
}

export const onDrop = (event: DragEvent) => {
  if (!(event.target instanceof Node)) return false
  const dropTargetNode = $getNearestNodeFromDOMNode(event.target)
  if (!dropTargetNode) return false
  const imageNode = getImageNodeFromSelection()
  if (!imageNode) return false
  imageNode.remove(false)
  dropTargetNode.insertAfter(imageNode)

  return true
}

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
