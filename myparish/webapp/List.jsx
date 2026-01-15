const useState = React.useState

const Badge = ReactBootstrap.Badge


const List = React.memo(() => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const dayOfMonth = new Date().getDate()
  const month = new Date().getMonth() + 1
  const isSunday = (0 === new Date().getDay()) || (1 === month && (1 === dayOfMonth || 6 === dayOfMonth)) || (11 === month && 1 === dayOfMonth) || (12 === month && (25 === dayOfMonth || 26 === dayOfMonth)) ? true : false

  const all = clients.clients.map(i => {
    let incoming = ''
    const now = new Date()
    const base = new Date()
    const schedule = isSunday ? (i.sunday ?? []) : i.week
    schedule.forEach((j, _) => {
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
      incoming: incoming.trim()
    }
  })

  const selected = clients.clients.find(i => i.name === store.getState().value)

  const [filtered, setFiltered] = useState(all)
  const [phrase, setPhrase] = useState('')
  const [active, setActive] = useState(false)
  const [live, setLive] = useState(false)

  const filterByCriteria = (active, live, phrase) => {
    let preFiltered = all
    if (active) {
      preFiltered = preFiltered.filter(i => !!i.incoming)
      preFiltered.sort((a, b) => a.incoming.localeCompare(b.incoming))
    }
    if (live) {
      preFiltered = preFiltered.filter(i => (true === i.live) && !!i.incoming)
      preFiltered.sort((a, b) => a.incoming.localeCompare(b.incoming))
    }
    setFiltered(2 < phrase.length ? preFiltered.filter(i => i.name.toLowerCase().includes(phrase)) : preFiltered)
  }

  const handleClick = React.useCallback((name) => {
    navigate(`/selected/${name}`)
  }, [name])

  const handleFilter = (event) => {
    const p = event.target.value.toLowerCase().trim()

    filterByCriteria(active, live, p)

    setPhrase(p)
  }

  const handleSwitchLive = (event) => {
    filterByCriteria(active, !live, phrase)

    setLive(!live)
  }

  const handleSwitchActive = (event) => {
    filterByCriteria(!active, live, phrase)

    setActive(!active)
  }

  return <>
    <Navi current="list" />
    <Container>
      <form class="form-inline my-2">
        <input class="form-control mr-sm-2" type="search" name="search" placeholder={t('label_search')} aria-label="Search" onKeyUp={handleFilter} />
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
})
