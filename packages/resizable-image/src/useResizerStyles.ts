import { makeStyles } from "@material-ui/core"

const useResizerStyles = makeStyles({
  root: {
    height: "10px",
    width: "10px",
    position: "absolute",
    backgroundColor: "rgb(60, 132, 244)",
    border: "1px solid #fff",
    zIndex: 3,
  },
  north: {
    marginLeft: "auto",
    marginRight: "auto",
    top: "-5px",
    cursor: "n-resize",
  },
  south: {
    marginLeft: "auto",
    marginRight: "auto",
    bottom: "-5px",
    cursor: "s-resize",
  },
  east: {
    marginTop: "auto",
    marginBottom: "auto",
    right: "-5px",
    cursor: "w-resize",
  },
  west: {
    marginTop: "auto",
    marginBottom: "auto",
    left: "-5px",
    cursor: "e-resize",
  },
  ne: {
    top: "-5px",
    right: "-5px",
    cursor: "ne-resize",
  },
  nw: {
    top: "-5px",
    left: "-5px",
    cursor: "nw-resize",
  },
  se: {
    bottom: "-5px",
    right: "-5px",
    cursor: "se-resize",
  },
  sw: {
    bottom: "-5px",
    left: "-5px",
    cursor: "sw-resize",
  },
})

export default useResizerStyles
