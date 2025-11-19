const Manage = () => {
  const [selectedTab, setSelectedTab] = useState('')

  const [show, setShow] = useState(false)

  const switchTab = (e) => {
    setSelectedTab(e.target.id)
  }

  const DisplayTab = () => {
    if (selectedTab === 'currentMonthBT') return <Tab1 />
    else if (selectedTab === 'dashboardBT') return 'Dashboard'
    else return 'Błąd'
  }

  const handleClose = () => {
    setShow(false)
  }

  const handleShow = () => {
    setShow(true)
  }
  
  return <>
    <header class="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
      <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#">Nazwa parafii</a>
      <ul class="navbar-nav flex-row d-md-none">
        <li class="nav-item text-nowrap">
          <button class="nav-link px-3 text-white" type="button" onClick={handleShow}><i class="bi bi-list" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu"></i></button>
        </li>
      </ul>
    </header>
    <div class="container-fluid">
    <div class="row">
      <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Nazwa Parafii</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-2 active" aria-current="page" onClick={switchTab} id="dashboardBT"> Dashboard </a>
              </li>
            </ul>
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
              <span> Saved reports</span>
              <a class="link-secondary" href="#" aira-label="Add a new report"></a>
            </h6>
            <ul class="nav flex-column mb-auto">
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-2" onClick={switchTab} id="currentMonthBT">Current month</a>
              </li>
            </ul>
            <hr class="my-3" />
            <ul class="nav flex-column mb-auto">
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-2" onClick={switchTab} id="settingsBT">Settings</a>
              </li>
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <DisplayTab />
      </main>
    </div>
  </div></>
}
