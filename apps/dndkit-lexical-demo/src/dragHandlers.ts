import { DragStartEvent, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { Dispatch, SetStateAction } from "react"

export const onDragStart = (event: DragStartEvent) => {}

export const onDragEndCreator =
  (setState: Dispatch<SetStateAction<UniqueIdentifier[]>>) =>
  (event: DragEndEvent) => {
    const { active, over } = event
    if (!active.id || !over?.id) return

    setState((previousState) => {
      const activeIndex = previousState.indexOf(active.id)
      const overIndex = previousState.indexOf(over.id)
      return arrayMove(previousState, activeIndex, overIndex)
    })
  }
