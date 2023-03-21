import { createEditor, $getRoot } from "lexical"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import type { InitialConfigType } from "@lexical/react/LexicalComposer"
import FlexLayoutNode, { $createFlexLayoutNode } from "./FlexLayoutNode"

const generateInitialEditorState = () => {
  const editor = createEditor({ nodes: [FlexLayoutNode] })
  editor.update(() => {
    const root = $getRoot()
    const flexLayoutNode = $createFlexLayoutNode()
    // console.log(flexLayoutNode)
    root.append(flexLayoutNode)
    console.log(root)
  })
  return editor.getEditorState()
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
  console.log(generateInitialEditorState())
  //   editorState = editorState || generateInitialEditorState()
  //   console.log(editorState)
  return (
    <LexicalComposer initialConfig={{ ...initialConfig, editorState }}>
      {children}
    </LexicalComposer>
  )
}

export default LexicalComposerFlex
