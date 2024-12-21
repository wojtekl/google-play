const useState = React.useState


const List = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [filtered, setFiltered] = useState(clients.clients)

  const handleClick = (name) => {
    navigate(`/selected/${name}`)
  }

  const handleFilter = (event) => {
    setFiltered(clients.clients.filter(i => i.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return <>
    <Navbar expand="md">
      <Container>
        <Navbar.Brand><img src="https://github.com/wojtekl/google-play/raw/refs/heads/main/myparish/MyParish/app/src/main/res/mipmap-mdpi/ic_launcher_round.webp" width="30px" height="30px" />{t('title_app')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#/">{t('nav_map')}</Nav.Link>
            <Nav.Link href="#/news">{t('nav_news')}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container>
      <form class="form-inline my-2">
        <input class="form-control mr-sm-2" type="search" placeholder={t('label_search')} aria-label="Search" onKeyUp={handleFilter} />
      </form>
      <ListGroup>
        {filtered.map(i => <ListGroup.Item action onClick={() => handleClick(i.name)}>{i.name}</ListGroup.Item>)}
      </ListGroup>
    </Container>
  </>
}