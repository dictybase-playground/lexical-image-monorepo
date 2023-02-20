import ToolBar from "@material-ui/core/Toolbar"
import { makeStyles } from "@material-ui/core"
import InsertImageButton from "./components/InsertImageButton"

const useToolbarStyles = makeStyles({
  root: {
    marginBottom: "1px",
    background: "#fff",
  },
})

const DictybaseToolbar = () => {
  const { root } = useToolbarStyles()
  return (
    <ToolBar variant="dense" className={root}>
      <InsertImageButton />
    </ToolBar>
  )
}

export default DictybaseToolbar
