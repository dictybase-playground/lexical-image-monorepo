import { makeStyles, Theme } from "@material-ui/core"
import { ImageAlignment } from "./state"

export type StyleProperties = {
  height: number
  width: number
  alignment: ImageAlignment
  fit: string
  duration: number
  easing: string
  loading: boolean
  error: boolean
}

const useImageStyles = makeStyles<Theme, StyleProperties>({
  root: {
    margin: "10px",
    float: ({ alignment }) => alignment,
    position: "relative",
    height: ({ height: currentHeight }) => `${currentHeight}px`,
    width: ({ width: currentWidth }) => `${currentWidth}px`,
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    overflow: "hidden",
  },
  image: {
    aspectRatio: "1",
    width: "100%",
    height: "100%",
    "object-fit": ({ fit }) => fit,
    animationName: `$materialize`,
    animationDuration: ({ duration }) => `${duration}ms`,
    animationTimingFunction: ({ easing }) => easing,
    zIndex: ({ error }) => (error ? -1 : 1),
  },
  icons: {
    width: "100%",
    marginLeft: "-100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  "@keyframes materialize": {
    "0%": {
      filter: "saturate(20%) contrast(50%) brightness(160%)",
      opacity: "0",
    },
    "75%": {
      filter: "saturate(60%) contrast(100%) brightness(100%)",
      opacity: "1",
    },
    "100%": {
      filter: "saturate(100%) contrast(100%) brightness(100%)",
      opacity: "1",
    },
  },
})

export default useImageStyles
