import DictyThemeProvider from "./ThemeProvider"
import Header from "./Header"
import SortableArea from "./SortableArea"
import Footer from "./Footer"

const App = () => (
  <DictyThemeProvider>
    <Header />
    <SortableArea />
    <Footer />
  </DictyThemeProvider>
)

export default App
