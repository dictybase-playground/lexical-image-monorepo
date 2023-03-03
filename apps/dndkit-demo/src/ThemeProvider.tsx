import { ReactChild } from "react"
import { createTheme, ThemeProvider } from "@material-ui/core"

const dictyTheme = createTheme({
  palette: {
    primary: {
      main: "hsl(210, 100%, 25.1%)",
    },
  },
})

type DictyThemeProviderProperties = {
  children: ReactChild | ReactChild[]
}

const DictyThemeProvider = ({ children }: DictyThemeProviderProperties) => (
  <ThemeProvider theme={dictyTheme}>{children}</ThemeProvider>
)

export default DictyThemeProvider
