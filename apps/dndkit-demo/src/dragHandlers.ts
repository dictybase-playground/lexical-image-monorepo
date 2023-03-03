import { DragStartEvent, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { Dispatch, SetStateAction } from "react"

export const onDragStart = (event: DragStartEvent) => {}
export const onDragEndCreator =
  (setState: Dispatch<SetStateAction<UniqueIdentifier[]>>) =>
  (event: DragEndEvent) => {
    const { active, over } = event
    setState((previousState) => {
      if (!active || !over) return previousState
      const activeIndex = previousState.indexOf(active.id)
      const overIndex = previousState.indexOf(over.id)
      console.log("setting state")
      return arrayMove(previousState, activeIndex, overIndex)
    })
  }
