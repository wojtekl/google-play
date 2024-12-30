const withTranslation = ReactI18next.withTranslation


class NewsInner extends React.Component {

  render() {
    const { t } = this.props

    return <>
      <Navbar expand="md">
        <Container>
          <Navbar.Brand><img src="https://github.com/wojtekl/google-play/raw/refs/heads/main/myparish/MyParish/app/src/main/res/mipmap-mdpi/ic_launcher_round.webp" width="30px" height="30px" alt="" />{t('title_app')}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#/">{t('nav_map')}</Nav.Link>
              <Nav.Link href="#/list">{t('nav_list')}</Nav.Link>
              <Nav.Link href="https://wlap.pl">{t('nav_aboutus')}</Nav.Link>
              <Nav.Link href={t('url_privacy')}>{t('nav_privacy')}</Nav.Link>
              <Nav.Link href="https://play.google.com/store/apps/details?id=github.wleap.myparish"><Image src={t('url_get')} height="40px" /></Nav.Link>
              <Nav.Link disabled>
                <p>
                  <a href="https://achecks.org/checker/index.php?uri=referer&gid=WCAG2-AA">
                    <img src="https://achecks.org/images/icon_W2_aa.jpg" alt="WCAG 2.0 (Level AA)" height="32" width="102" />
                  </a>
                </p>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <ListGroup>
          <ListGroup.Item action href="https://m.niedziela.pl/">Niedziela</ListGroup.Item>
          <ListGroup.Item action href="https://www.gosc.pl/mobile">Gość Niedzielny</ListGroup.Item>
          <ListGroup.Item action href="https://rycerzniepokalanej.pl/">Rycerz Niepokalanej</ListGroup.Item>
        </ListGroup>
      </Container>
    </>
  }
}

const News = withTranslation()(NewsInner)