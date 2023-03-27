import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { TableCellNode, TableRowNode } from "@lexical/table"
import { Grid, Paper, makeStyles } from "@material-ui/core"
import { ImageNode, ImagePlugin } from "image-plugin"
import { LocalPersistencePlugin } from "persistence-plugin"
import { WidthTablePlugin, WidthTableNode } from "width-table-plugin"
import { TableActionPlugin } from "table-action-plugin"
import { TreeViewPlugin } from "treeview-plugin"
import {
  FlexLayoutPlugin,
  FlexLayoutNode,
  FlexLayoutDecoratorNode,
  LexicalComposerFlex,
} from "flex-layout-plugin"
import Toolbar from "dictybase-toolbar"
import {
  useEditorInputStyles,
  useEditorPlaceholderStyles,
} from "./useEditorStyles"
import usePersistencePluginStyles from "./usePersistencePluginStyles"
import "./editor.css"

const usePaperStyles = makeStyles({
  root: {
    position: "relative",
    overflow: "hidden",
  },
})

const editorTheme = {
  paragraph: "editor-paragraph",
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    underline: "editor-text-underline",
  },
  table: "editor-table",
  tableCell: "editor-tablecell",
  tableCellHeader: "editor-tablecell-head",
  image: "editor-image",
  flexLayout: "editor-flex-layout",
}

const onError = (error: Error) => {
  // eslint-disable-next-line no-console
  console.error(error)
}

const initialConfig = {
  namespace: "DictyEditor",
  theme: { ...editorTheme },
  nodes: [
    HeadingNode,
    QuoteNode,
    ListItemNode,
    ListNode,
    ImageNode,
    TableCellNode,
    TableRowNode,
    WidthTableNode,
    FlexLayoutNode,
    FlexLayoutDecoratorNode,
  ],
  onError,
}

const EditorV8 = () => {
  const inputClasses = useEditorInputStyles()
  const placeholderClasses = useEditorPlaceholderStyles()
  const persistencePluginStyles = usePersistencePluginStyles()
  const paperClasses = usePaperStyles()

  return (
    <LexicalComposerFlex initialConfig={initialConfig}>
      <HistoryPlugin />
      <ListPlugin />
      <ImagePlugin />
      <WidthTablePlugin />
      <TableActionPlugin />
      <FlexLayoutPlugin />
      <Grid container direction="column">
        <Grid item>
          <Toolbar />
        </Grid>
        <Grid item>
          <Paper className={paperClasses.root}>
            <RichTextPlugin
              ErrorBoundary={LexicalErrorBoundary}
              contentEditable={
                <ContentEditable className={inputClasses.root} />
              }
              placeholder={
                <div className={placeholderClasses.root}>
                  Enter some text...
                </div>
              }
            />
          </Paper>
        </Grid>
        <Grid item className={persistencePluginStyles.root}>
          <LocalPersistencePlugin />
        </Grid>
      </Grid>
      <TreeViewPlugin />
    </LexicalComposerFlex>
  )
}

export default EditorV8
