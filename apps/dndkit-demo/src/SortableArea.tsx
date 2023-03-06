import { useState } from "react"
import { DndContext, UniqueIdentifier, useDroppable } from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import { Container } from "@material-ui/core"
import onDragEndCreator from "./dragHandlers"
import SortableItem from "./SortableItem"
import useContentAreaStyles from "./useContentAreaStyles"

const SortableArea = () => {
  const [items, setItems] = useState<UniqueIdentifier[]>(["1", "2", "3"])
  const { setNodeRef } = useDroppable({
    id: "droppable-area",
  })
  const { root } = useContentAreaStyles()

  const onDragEnd = onDragEndCreator(setItems)

  return (
    <DndContext onDragEnd={onDragEnd}>
      <SortableContext items={items}>
        <Container ref={setNodeRef} className={root}>
          {items.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </Container>
      </SortableContext>
    </DndContext>
  )
}

export default SortableArea
