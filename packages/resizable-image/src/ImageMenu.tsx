import { MouseEvent } from "react"
import { Paper, ButtonGroup, IconButton } from "@material-ui/core"
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft"
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight"
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter"
import { useAtom } from "jotai"
import { ImageAlignment, ImageAlignmentAtom } from "./state"
import useImageMenuStyles from "./useImageMenuStyles"

const alignmentIconMap = {
  left: <FormatAlignLeftIcon />,
  none: <FormatAlignCenterIcon />,
  right: <FormatAlignRightIcon />,
}

const ImageMenu = () => {
  const { root } = useImageMenuStyles()
  const [alignment, setAlignment] = useAtom(ImageAlignmentAtom)

  const onClick = (event: MouseEvent) => {
    // This is to prevent another event handler that causes the
    // selection to be set to null
    event.stopPropagation()
  }

  return (
    <Paper onClick={onClick} className={root}>
      <ButtonGroup>
        {Object.keys(alignmentIconMap).map((key) => (
          <IconButton
            disabled={alignment === key}
            size="small"
            onClick={() => setAlignment(key as ImageAlignment)}>
            {alignmentIconMap[key as ImageAlignment]}
          </IconButton>
        ))}
      </ButtonGroup>
    </Paper>
  )
}

export default ImageMenu
