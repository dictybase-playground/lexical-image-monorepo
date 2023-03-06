import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { DndContext } from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import { Paper, makeStyles } from "@material-ui/core"
import { ImageNode, ImagePlugin } from "image-plugin"
import {
  useEditorInputStyles,
  useEditorPlaceholderStyles,
} from "./useEditorStyles"
import "./editor.css"

const onError = (error: Error) => {
  // eslint-disable-next-line no-console
  console.error(error)
}

const editorTheme = {
  paragraph: "editor-paragraph",
}

const initialConfig = {
  namespace: "dndkit-editor",
  theme: { ...editorTheme },
  nodes: [ImageNode],
  onError,
}

const usePaperStyles = makeStyles({
  root: {
    position: "relative",
  },
})

const Editor = () => {
  const inputClasses = useEditorInputStyles()
  const placeholderClasses = useEditorPlaceholderStyles()
  const paperClasses = usePaperStyles()

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <DndContext>
        <Paper className={paperClasses.root}>
          <RichTextPlugin
            contentEditable={<ContentEditable className={inputClasses.root} />}
            ErrorBoundary={LexicalErrorBoundary}
            placeholder={
              <div className={placeholderClasses.root}>Enter some text...</div>
            }
          />
        </Paper>
      </DndContext>
    </LexicalComposer>
  )
}

export default Editor
