const Navbar = ReactBootstrap.Navbar
const Nav = ReactBootstrap.Nav


const Navi = React.memo((props) => {
  const { t } = useTranslation()
  const { current } = props

  const selected = clients.clients.find(i => i.name === store.getState().value)

  const handleInstall = () => {
    alert(installPrompt)
    if (installPrompt) {
      installPrompt.prompt()
    }
    else {
      navigate('https://wlap.pl/howto/')
    }
  }

  return <>
    <Navbar expand="md">
      <div class="container">
        <Navbar.Brand><img src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/myparish/MojaParafia/app/src/main/res/mipmap-mdpi/ic_launcher_round.webp" width="30px" height="30px" alt="" />{t('title_app')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {selected && 'selected' != current && <Nav.Link href={`#/selected/${selected.name}`}>{t('nav_your')}</Nav.Link>}
            {'map' != current && <Nav.Link href="#/">{t('nav_map')}</Nav.Link>}
            {'list' != current && <Nav.Link href="#/list">{t('nav_list')}</Nav.Link>}
            {'news' != current && <Nav.Link href="#/news">{t('nav_news')}</Nav.Link>}
            <Nav.Link onClick={handleInstall}>{t('nav_install')}</Nav.Link>
            <Nav.Link href="#/manage">{t('nav_manage')}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  </>
})
