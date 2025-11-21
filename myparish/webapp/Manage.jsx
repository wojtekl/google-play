const Manage = () => {
  const { t } = useTranslation()
  const [selectedTab, setSelectedTab] = useState('dashboardBT')
  const [tenant, setTenant] = useState('')
  const { navigate } = useNavigate()

  const switchTab = (e) => {
    setSelectedTab(e.target.id)
  }

  const DisplayTab = () => {
    if (selectedTab === 'dashboardBT') return <Dashboard />
    else if (selectedTab === 'currentMonthBT') return <Tab2 />
      else if (selectedTab === 'settingsBT') return <Settings />
    else return 'Błąd'
  }

  useEffect(() => {
      axios.get(`api/signin`).then((response) => 
          if(trim(response.data) != '') setTenant(response.data)
        else navigate('/signin')
      })
    }, [])
  
  return <>
    <header class="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
      <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#">{tenant}</a>
      <ul class="navbar-nav flex-row d-md-none">
        <li class="nav-item text-nowrap">
          <button class="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation"><i class="bi bi-list" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu"></i></button>
        </li>
      </ul>
    </header>
    <div class="container-fluid">
    <div class="row">
      <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
        <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="sidebarMenuLabel">{t('label_nazwa')}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-2 active" aria-current="page" onClick={switchTab} id="dashboardBT"><i class="bi bi-house-fill"></i> {t('label_dashboard')} </a>
              </li>
            </ul>
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
              <span> {t('label_scheduled_event')} </span>
              <button class="link-secondary" aria-label="Add a new report" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-plus-circle"></i></button>
            </h6>
            <ul class="nav flex-column mb-auto">
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-2" onClick={switchTab} id="currentMonthBT"><i class="bi bi-file-earmark-text"></i> {t('label_current_week')} </a>
              </li>
            </ul>
            <hr class="my-3" />
            <ul class="nav flex-column mb-auto">
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-2" onClick={switchTab} id="settingsBT"><i class="bi bi-gear-wide-connected"></i> {t('label_settings')} </a>
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-2" onClick={() => {alert('logout')}} id="signout"><i class="bi bi-door-closed"></i> {t('label_signout')} </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <DisplayTab />
      </main>
    </div>
  </div><Modal /></>
}
