import DictyThemeProvider from "./ThemeProvider"
import Header from "./Header"
import Editor from "./Editor"
import Footer from "./Footer"

const App = () => (
  <DictyThemeProvider>
    <Header />
    <Editor />
    <Footer />
  </DictyThemeProvider>
)

export default App
