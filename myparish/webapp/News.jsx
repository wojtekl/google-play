const withTranslation = ReactI18next.withTranslation


class News extends React.Component {

  render() {
    const { t } = this.props

    return <Container>
  <ListGroup>
    <ListGroup.Item action href="https://m.niedziela.pl/">Niedziela</ListGroup.Item>
    <ListGroup.Item action href="https://www.gosc.pl/mobile">Gość Niedzielny</ListGroup.Item>
    <ListGroup.Item action href="https://rycerzniepokalanej.pl/">Rycerz Niepokalanej</ListGroup.Item>
  </ListGroup>
</Container>
  }
}