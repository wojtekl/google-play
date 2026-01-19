const Navbar = ReactBootstrap.Navbar
const Nav = ReactBootstrap.Nav


const Navi = React.memo((props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { current } = props

  const selected = clients.clients.find(i => i.name === store.getState().value)

  const handleInstall = () => {
    if (installPrompt) {
      installPrompt.prompt()
    }
    else {
      window.location.href = 'https://wlap.pl/howto/'
    }
  }

  return <>
    <div class="navbar navbar-expand-md">
      <div class="container">
        <div class="navbar-brand"><img src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/myparish/MojaParafia/app/src/main/res/mipmap-mdpi/ic_launcher_round.webp" width="30px" height="30px" alt="" />{t('title_app')}</div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#basic-navbar-nav" aria-controls="basic-navbar-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="basic-navbar-nav">
          <div className="navbar-nav me-auto">
            {selected && 'selected' != current && <Nav.Link href={`#/selected/${selected.name}`}>{t('nav_your')}</Nav.Link>}
            {'map' != current && <Nav.Link href="#/">{t('nav_map')}</Nav.Link>}
            {'list' != current && <Nav.Link href="#/list">{t('nav_list')}</Nav.Link>}
            {'news' != current && <Nav.Link href="#/news">{t('nav_news')}</Nav.Link>}
            <Nav.Link onClick={handleInstall}>{t('nav_install')}</Nav.Link>
            <Nav.Link href="#/manage">{t('nav_manage')}</Nav.Link>
          </div>
        </div>
      </div>
    </div>
  </>
})
