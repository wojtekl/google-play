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
            {selected && 'selected' != current && <div class="nav-item"><a class="nav-link" href={`#/selected/${selected.name}`}>{t('nav_your')}</a></div>}
            {'map' != current && <div class="nav-item"><a class="nav-link active" aria-current="page" href="#/">{t('nav_map')}</a></div>}
            {'list' != current && <div class="nav-item"><a class="nav-link" href="#/list">{t('nav_list')}</a></div>}
            {'news' != current && <div class="nav-item"><a class="nav-link" href="#/news">{t('nav_news')}</a></div>}
            <div class="nav-item"><a class="nav-link" onClick={handleInstall}>{t('nav_install')}</a></div>
            <div class="nav-item"><a class="nav-link" href="#/manage">{t('nav_manage')}</a></div>
          </div>
        </div>
      </div>
    </div>
  </>
})
