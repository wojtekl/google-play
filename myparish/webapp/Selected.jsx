const Breadcrumb = ReactBootstrap.Breadcrumb


const Selected = () => {
  const { name } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleClick = () => {
    navigate(-1);
  };

  const handleSelect = () => {
    store.dispatch({ type: 'selected/added', payload: name })
  }

  const selected = clients.clients.find(i => i.name === name)

  return (<>
    <Navbar expand="md">
      <Container>
        <Navbar.Brand><img src="https://github.com/wojtekl/google-play/raw/refs/heads/main/myparish/MyParish/app/src/main/res/mipmap-mdpi/ic_launcher_round.webp" width="30px" height="30px" alt="" />{t('title_app')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#/list">{t('nav_list')}</Nav.Link>
            <Nav.Link href="#/news">{t('nav_news')}</Nav.Link>
            <Nav.Link href="https://wlap.pl" rel="author">{t('nav_aboutus')}</Nav.Link>
            <Nav.Link href={t('url_privacy')} rel="privacy-policy">{t('nav_privacy')}</Nav.Link>
            <Nav.Link href="https://play.google.com/store/apps/details?id=github.wleap.myparish" rel="external"><Image src={t('url_get')} style={{ maxHeight: "40px" }} /></Nav.Link>
            <Nav.Link disabled>
              <p>
                <a href="https://achecks.org/checker/index.php?uri=referer&gid=WCAG2-AA" rel="external">
                  <img src="https://achecks.org/images/icon_W2_aa.jpg" alt="WCAG 2.0 (Level AA)" height="32" width="102" />
                </a>
              </p>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item><a href="javascript:;" onClick={handleClick}> {t('button_back')} </a></Breadcrumb.Item>
        {selected && <Breadcrumb.Item active>{selected.name}</Breadcrumb.Item>}
      </Breadcrumb>
      {selected ? <ListGroup>
        <ListGroup.Item action href={selected.schedule} rel="external">{t('list_schedule')}</ListGroup.Item>
        <ListGroup.Item action href={selected.announcement} rel="external">{t('list_announcement')}</ListGroup.Item>
        <ListGroup.Item action href={selected.contact} rel="external">{t('list_contact')}</ListGroup.Item>
        {selected.other && <ListGroup.Item action href={selected.other} rel="external">{t('list_other')}</ListGroup.Item>}
        {selected.live && <ListGroup.Item action href={selected.live} rel="external">{t('list_live')}</ListGroup.Item>}
        <ListGroup.Item action href={`https://www.openstreetmap.org/directions?from=&to=${selected.latitude}%2C${selected.longitude}`} rel="external">{t('list_directions')}</ListGroup.Item>
        <ListGroup.Item action onClick={handleSelect}>{t('list_select')}</ListGroup.Item>
      </ListGroup> : <p>{t('label_missing')}</p>}
    </Container>
  </>)
}