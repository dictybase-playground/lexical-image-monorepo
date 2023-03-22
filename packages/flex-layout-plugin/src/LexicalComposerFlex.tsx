import { createEditor, $getRoot, $createParagraphNode } from "lexical"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import type { NodeMap } from "lexical"
import type { InitialConfigType } from "@lexical/react/LexicalComposer"
import FlexLayoutNode, { $createFlexLayoutNode } from "./FlexLayoutNode"

const initialEditorState: NodeMap = new Map([["3", FlexLayoutNode]])

const generateInitialEditorState = () => {
  const editor = createEditor({ nodes: [FlexLayoutNode] })
  editor.update(() => {
    const root = $getRoot()
    const flexLayoutNode = $createFlexLayoutNode()
    root.append(flexLayoutNode)
    root.append($createParagraphNode())
  })
  return editor
}

type LexicalComposerFlexProperties = {
  initialConfig: InitialConfigType
  children: JSX.Element | string | (JSX.Element | string)[]
}

const LexicalComposerFlex = ({
  initialConfig,
  children,
}: LexicalComposerFlexProperties) => {
  let { editorState } = initialConfig
  const editor = generateInitialEditorState()
  console.log(editor.getEditorState())
  //   console.log(generateInitialEditorState())
  //   editorState = editorState || generateInitialEditorState()
  //   console.log(editorState)
  return (
    <LexicalComposer initialConfig={{ ...initialConfig, editorState }}>
      {children}
    </LexicalComposer>
  )
}

export default LexicalComposerFlex
