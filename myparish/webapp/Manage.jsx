const useEffect = React.useEffect

const Manage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  
  const [selectedTab, setSelectedTab] = useState('dashboardLink')
  const [tenant, setTenant] = useState(store.getState().tenant)

  useEffect(() => {
    axios.get('api/signin').then((response) => {
      console.debug(response.data)
      if (!response.data) {
        store.dispatch({ type: 'tenant/set', payload: undefined })
        setTenant(undefined)
        navigate('/signin')
      }
      else {
        store.dispatch({ type: 'tenant/set', payload: response.data })
        setTenant(response.data)
      }
    })
  }, [])

  const handleSignout = () => {
    axios.get('api/signin-cd').then((response) => {
      console.debug(response.data)
      store.dispatch({ type: 'tenant/set', payload: undefined })
      setTenant(undefined)
      navigate('/signin')
    })
  }

  const handleSwitchTab = (e) => {
    e.preventDefault()
    setSelectedTab(e.target.id)
  }

  const DisplayTab = () => {
    if ('currentWeekLink' === selectedTab) {
      return <CurrentWeek date={'2025-12-24'} type="eucharystia" />
    }
    else if ('nextWeekLink' === selectedTab) {
      return <CurrentWeek date={ new Date().toISOString().split('T')[0] } type="eucharystia" />
    }
    else if ('yearLink' === selectedTab) {
      return <Weeks />
    }
    else if ('orderLink' === selectedTab) {
      return <CurrentWeek type="eucharystia" />
    }
    else if ('departureLink' === selectedTab) {
      return <CurrentWeek date={ new Date().toISOString().split('T')[0] } type="departure" />
    }
    else if ('visitLink' === selectedTab) {
      return <Settings />
    }
    else if ('settingsLink' === selectedTab) {
      return <Settings />
    }
    return <Dashboard />
  }
  
  return !tenant ? <></> : <>
    <header class="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
      <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#">{`${t('label_tenant')}: ${tenant}`}</a>
      <ul class="navbar-nav flex-row d-md-none">
        <li class="nav-item text-nowrap">
          <button class="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label={t('label_toggle_navigation')}>
            <i class="bi bi-list"></i>
          </button>
        </li>
      </ul>
    </header>
    <div class="container-fluid">
      <div class="row">
        <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
          <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="sidebarMenuLabel">{`${t('label_tenant')}: ${tenant}`}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label={t('label_close')}></button>
            </div>
            <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center gap-2 active" aria-current="page" href="#" onClick={handleSwitchTab} id="dashboardLink"><i class="bi bi-house-fill"></i> {t('label_dashboard')} </a>
                </li>
              </ul>
              <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                <span>{t('label_scheduled_event')}</span>
                <a class="link-secondary" href="#" aria-label={t('label_add_scheduled')} data-bs-toggle="modal" data-bs-target="#newScheduledModal">
                  <i class="bi bi-plus-circle"></i>
                </a>
              </h6>
              <ul class="nav flex-column mb-auto">
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center gap-2" href="#" id="currentWeekLink" onClick={handleSwitchTab}><i class="bi bi-file-earmark-text"></i> {t('label_current_week')} </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center gap-2" href="#" id="nextWeekLink" onClick={handleSwitchTab}><i class="bi bi-file-earmark-text"></i> {t('label_next_week')} </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center gap-2" href="#" id="yearLink" onClick={handleSwitchTab}><i class="bi bi-file-earmark-text"></i> {t('label_year')} </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center gap-2" href="#" id="orderLink" onClick={handleSwitchTab}><i class="bi bi-file-earmark-text"></i> {t('label_order')} </a>
                </li>
              </ul>
              <hr class="my-3" />
              <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                <span>{t('label_visit')}</span>
                <a class="link-secondary" href="#" aria-label={t('label_add_visit')} data-bs-toggle="modal" data-bs-target="#newVisitModal">
                  <i class="bi bi-plus-circle"></i>
                </a>
              </h6>
              <ul class="nav flex-column mb-auto">
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center gap-2" href="#" id="visitLink" onClick={handleSwitchTab}><i class="bi bi-file-earmark-text"></i> {t('label_visit')} </a>
                </li>
              </ul>
              <hr class="my-3" />
              <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                <span>{t('label_departure')}</span>
                <a class="link-secondary" href="#" aria-label={t('label_add_departure')} data-bs-toggle="modal" data-bs-target="#newDepartureModal">
                  <i class="bi bi-plus-circle"></i>
                </a>
              </h6>
              <ul class="nav flex-column mb-auto">
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center gap-2" href="#" id="departureLink" onClick={handleSwitchTab}><i class="bi bi-file-earmark-text"></i> {t('label_departure')} </a>
                </li>
              </ul>
              <hr class="my-3" />
              <ul class="nav flex-column mb-auto">
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center gap-2" href="#" id="settingsLink" onClick={handleSwitchTab}><i class="bi bi-gear-wide-connected"></i> {t('label_settings')} </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center gap-2" href="#" id="signoutLink" onClick={handleSignout}><i class="bi bi-door-closed"></i> {t('label_signout')} </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <DisplayTab />
        </main>
      </div>
    </div>
    <Modal modalId="newScheduledModal" type="eucharystia" />
    <Modal modalId="newDepartureModal" type="departure" />
  </>
}
