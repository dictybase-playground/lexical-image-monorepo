import { UniqueIdentifier } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Paper } from "@material-ui/core"
import useSortableItemStyles from "./useSortableItemStyles"

type SortableItemProperties = {
  id: UniqueIdentifier
}

const SortableItem = ({ id }: SortableItemProperties) => {
  const { setNodeRef, listeners, attributes, transform, transition } =
    useSortable({ id })

  //  not sure why makeStyles isn't working correctly with it
  // const { root } = useSortableItemStyles({
  //   transform: CSS.Transform.toString(transform),
  //   transition,
  // })
  const style = {
    minHeight: "100px",
    marginBottom: "10px",
    transition,
    transform: CSS.Transform.toString(transform),
  }
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Paper {...attributes} {...listeners} style={style} ref={setNodeRef}>
      {id}
    </Paper>
  )
}

export default SortableItem
