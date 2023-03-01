import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { ReactChild } from "react"

const DragHandlerKeys = [
  "onDragStart",
  "onDragMove",
  "onDragOver",
  "onDragEnd",
  "onDragCancel",
]

type DragHandler = (event: DragEndEvent) => void

type DragAndDropAreaProperties = {
  children: ReactChild | ReactChild[]
  onDragEnd: DragHandler
}

const DragAndDropArea = ({
  children,
  onDragEnd,
}: DragAndDropAreaProperties) => (
  <DndContext onDragEnd={onDragEnd}>{children}</DndContext>
)

export default DragAndDropArea
