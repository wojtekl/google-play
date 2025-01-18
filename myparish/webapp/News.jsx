const withTranslation = ReactI18next.withTranslation


class NewsInner extends React.Component {

  render() {
    const { t } = this.props

    const selected = clients.clients.find(i => i.name === store.getState().value)

    return <>
      <Navbar expand="md">
        <Container>
          <Navbar.Brand><img src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/myparish/MojaParafia/app/src/main/res/mipmap-mdpi/ic_launcher_round.webp" width="30px" height="30px" alt="" />{t('title_app')}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {selected && <Nav.Link href={`#/selected/${selected.name}`}>{t('nav_your')}</Nav.Link>}
              <Nav.Link href="#/">{t('nav_map')}</Nav.Link>
              <Nav.Link href="#/list">{t('nav_list')}</Nav.Link>
              <Nav.Link href="https://wlap.pl/" rel="author">{t('nav_aboutus')}</Nav.Link>
              <Nav.Link href={t('url_privacy')} rel="privacy-policy">{t('nav_privacy')}</Nav.Link>
              <Nav.Link href="https://wlap.pl/howto/">{t('nav_install')}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <ListGroup>
          <ListGroup.Item action href="https://m.niedziela.pl/" rel="external">Niedziela</ListGroup.Item>
          <ListGroup.Item action href="https://www.gosc.pl/mobile" rel="external">Gość Niedzielny</ListGroup.Item>
          <ListGroup.Item action href="https://rycerzniepokalanej.pl/" rel="external">Rycerz Niepokalanej</ListGroup.Item>
        </ListGroup>
      </Container>
    </>
  }
}

const News = withTranslation()(NewsInner)