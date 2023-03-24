import { useEffect, useRef, FormEvent } from "react"
import { Grid, Typography } from "@material-ui/core"
import { $getNodeByKey, NodeKey } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import useFlexLayoutStyles from "./FlexLayoutStyles"

type FlexLayoutProperties = {
  nodeKey: NodeKey
  textContent?: string
  // imageUrl?: string
  // imagePosition?: "start" | "end"
}

const FlexLayout = ({
  nodeKey: key,
  textContent = "",
}: // imageUrl = "",
// imagePosition = "start",
FlexLayoutProperties) => {
  const [editor] = useLexicalComposerContext()
  const paragraphReference = useRef<HTMLParagraphElement>(null)
  const { item } = useFlexLayoutStyles()

  useEffect(() => {
    console.log("useEffect")
    if (paragraphReference.current) {
      console.log("Paragraph Text", paragraphReference.current.innerHTML)
      paragraphReference.current.innerHTML = textContent
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onInput = (event: FormEvent<HTMLParagraphElement>) => {
    editor.update(() => {
      const node = $getNodeByKey(key)
      if (!node || !(node.getType() === "flex-layout-decorator")) return
      node.setTextContent(event.currentTarget.textContent || textContent)
      console.log(node)
    })
  }

  return (
    <Grid container>
      <Grid item className={item}>
        <Typography
          ref={paragraphReference}
          contentEditable
          onInput={onInput}
          // onClick={() => console.log("onClick")}
        />
      </Grid>
    </Grid>
  )
}

export default FlexLayout
