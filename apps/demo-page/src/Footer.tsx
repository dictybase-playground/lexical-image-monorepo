import { Container, Typography } from "@material-ui/core"
import useFooterStyles from "./useFooterStyles"

const Footer = () => {
  const { root } = useFooterStyles()
  return (
    <Container maxWidth={false} className={root}>
      <Typography align="center">Footer</Typography>
    </Container>
  )
}

export default Footer
