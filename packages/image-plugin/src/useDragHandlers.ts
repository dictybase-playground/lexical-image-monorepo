import { pipe } from "fp-ts/function"
import * as O from "fp-ts/lib/Option"
import { $getNodeByKey } from "lexical"

export const isLexicalKeyPropertyName = (propertyName: string) => {
  const target = /^__lexicalKey_\D+/
  return target.test(propertyName)
}

export const findLexicalKeyPropertyNameFromElement = (element: HTMLElement) => {
  const maybeNodeKey = Object.keys(element).find(isLexicalKeyPropertyName)
  return maybeNodeKey ? O.some(maybeNodeKey) : O.none
}

export const getNodeKeyFromElement = (element: HTMLElement) =>
  // When a DOM element is created from a LexicalNode, it is created with a property __lexicalKey_xxxxx,
  // where xxxxx is a uniquely generated id of alphabetical characters, whose value is the lexical node key
  // We can filter the element's properties for the one that begins with __lexicalKey
  // Not sure if this is the best approach, but I prefer it to getting the nodekey from selection.
  // It doesn't rely on the current lexical editor selection correctly being the image node
  pipe(
    element,
    findLexicalKeyPropertyNameFromElement,
    O.match(
      () => null,
      (nodeKey) => $getNodeByKey(nodeKey),
    ),
  )

const useDragHandlers = () => {
  const onDragStart = (event: DragEvent) => {
    // ideally: event.target -> nodekey -> node -> serialized node
    // certainly: selection -> nodeKey -> node -> serialized node
  }

  return { onDragStart }
}

export default useDragHandlers
