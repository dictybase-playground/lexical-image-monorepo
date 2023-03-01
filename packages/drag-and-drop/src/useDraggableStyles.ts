import { makeStyles, Theme } from "@material-ui/core"
import { CSS, Transform } from "@dnd-kit/utilities"

type useDraggableStylesProperties = {
  transform: Transform | null
}

const useDraggableStyles = makeStyles<Theme, useDraggableStylesProperties>({
  root: {
    transform: ({ transform }) => CSS.Translate.toString(transform),
  },
})

export default useDraggableStyles
