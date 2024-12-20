const Breadcrumb = ReactBootstrap.Breadcrumb


const Selected = () => {
  const { name } = useParams()
  const { t } = useTranslation()

  store.dispatch({ type: 'selected/added', payload: name })

  const selected = clients.clients.find(i => i.name === name)

  return (<>
  <Navbar expand="md">
    <Container>
    <Navbar.Brand><img src="https://github.com/wojtekl/google-play/raw/refs/heads/main/myparish/MyParish/app/src/main/res/mipmap-mdpi/ic_launcher_round.webp" width="30px" height="30px" />{t('title_app')}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#/list">{t('nav_list')}</Nav.Link>
          <Nav.Link href="#/news">{t('nav_news')}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  <Container>
    <Breadcrumb><Breadcrumb.Item active>{selected.name}</Breadcrumb.Item></Breadcrumb>
    <ListGroup>
      <ListGroup.Item action href={selected.schedule}>{t('list_schedule')}</ListGroup.Item>
      <ListGroup.Item action href={selected.announcement}>{t('list_announcement')}</ListGroup.Item>
      <ListGroup.Item action href={selected.contact}>{t('list_contact')}</ListGroup.Item>
      {selected.other && <ListGroup.Item action href={selected.other}>{t('list_other')}</ListGroup.Item>}
      {selected.live && <ListGroup.Item action href={selected.live}>{t('list_live')}</ListGroup.Item>}
    </ListGroup>
  </Container>
</>)
}