const useState = React.useState

const Badge = ReactBootstrap.Badge


const List = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const all = clients.clients.map(i => {
    let incoming = ''
    const now = new Date()
    const base = new Date()
    i.week.forEach((j, _) => {
      base.setHours(j.substring(0, 2))
      base.setMinutes(j.substring(3, 5))
      const diff = base - now
      if ((diff >= -(1000 * 60 * 5)) && (diff < (1000 * 60 * 60))) {
        incoming = `${incoming} ${j}`
      }
    })
    return {
      name: i.name,
      live: !!i.live,
      incoming: incoming
    }
  })

  const [filtered, setFiltered] = useState(all)
  const [phrase, setPhrase] = useState('')
  const [active, setActive] = useState(false)
  const [live, setLive] = useState(false)

  const handleClick = (name) => {
    navigate(`/selected/${name}`)
  }

  const handleFilter = (event) => {
    const p = event.target.value.toLowerCase().trim()

    let preFiltered = all
    if (active) {
      preFiltered = preFiltered.filter(i => !!i.incoming)
    }
    if (live) {
      preFiltered = preFiltered.filter(i => i.live)
    }
    setFiltered(preFiltered.filter(i => i.name.toLowerCase().includes(p)))

    setPhrase(p)
  }

  const handleSwitchLive = (event) => {
    console.log(live, 'live')
    let preFiltered = all
    if (active) {
      preFiltered = preFiltered.filter(i => !!i.incoming)
    }
    if (!live) {
      preFiltered = preFiltered.filter(i => i.live)
    }
    setFiltered(preFiltered.filter(i => i.name.toLowerCase().includes(phrase)))

    setLive(!live)
  }

  const handleSwitchActive = (event) => {
    console.log(active, 'active')
    let preFiltered = all
    if (!active) {
      preFiltered = preFiltered.filter(i => !!i.incoming)
    }
    if (live) {
      preFiltered = preFiltered.filter(i => !!i.live)
    }
    setFiltered(preFiltered.filter(i => i.name.toLowerCase().includes(phrase)))

    setActive(!active)
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
        <div class="form-check form-switch">
          <input type="checkbox" class="form-check-input" id="switchLive" onChange={handleSwitchLive} />
          <label class="form-check-label" for="switchLive">{t('label_live')}</label>
        </div>
        <div class="form-check form-switch">
          <input type="checkbox" class="form-check-input" id="switchActive" onChange={handleSwitchActive} />
          <label class="form-check-label" for="switchActive">{t('label_active')}</label>
        </div>
      </form>
      <ListGroup>
        {filtered.map(i => <ListGroup.Item action onClick={() => handleClick(i.name)} className="d-flex justify-content-between align-tems-start"><div className="ms-2 me-auto">{i.name}</div><Badge bg={i.live ? 'danger' : 'primary'} pill>{i.incoming}</Badge></ListGroup.Item>)}
      </ListGroup>
    </Container>
  </>
}