/* eslint-disable react/jsx-props-no-spreading */
import { useDraggable } from "@dnd-kit/core"
import { NodeKey } from "lexical"
import { ReactChild } from "react"
import { Container } from "@material-ui/core"
import useDraggableStyles from "./useDraggableStyles"

type DraggableProperties = {
  id: NodeKey
  children: ReactChild
}

const Draggable = ({ id, children }: DraggableProperties) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })
  const { root } = useDraggableStyles({ transform })

  return (
    <Container
      maxWidth={false}
      ref={setNodeRef}
      className={root}
      {...attributes}
      {...listeners}
      disableGutters>
      {children}
    </Container>
  )
}

export default Draggable
