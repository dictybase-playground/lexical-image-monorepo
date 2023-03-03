import { makeStyles, Theme } from "@material-ui/core"

type useSortableItemStylesProperties = {
  transform: string | undefined
  transition: string | undefined
}

const useSortableItemStyles = makeStyles<
  Theme,
  useSortableItemStylesProperties
>({
  root: {
    minHeight: "100px",
    marginBottom: "10px",
    transform: ({ transform }) => transform,
    transition: ({ transition }) => transition,
  },
})

export default useSortableItemStyles
