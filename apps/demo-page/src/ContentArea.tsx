import { ReactChild } from "react"
import { Container } from "@material-ui/core"
import useContentAreaStyles from "./useContentAreaStyles"

type ContentAreaProperties = {
  children: ReactChild | ReactChild[]
}

const ContentArea = ({ children }: ContentAreaProperties) => {
  const { root } = useContentAreaStyles()

  return <Container className={root}>{children}</Container>
}

export default ContentArea
