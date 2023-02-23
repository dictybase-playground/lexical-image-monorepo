import { Editor } from "lexical-editor"
import DictyThemeProvider from "./ThemeProvider"
import Header from "./Header"
import ContentArea from "./ContentArea"
import Footer from "./Footer"

const App = () => (
  <DictyThemeProvider>
    <Header />
    <ContentArea>
      <Editor />
    </ContentArea>
    <Footer />
  </DictyThemeProvider>
)

export default App
