const List = React.memo(() => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const all = useGetClients()

  //const selected = clients.clients.find(i => i.name === store.getState().value)

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
    <div class="container">
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
        {filtered.map(i => <ListGroup.Item action onClick={() => handleClick(i.name)} className="d-flex justify-content-between align-tems-start"><div className="ms-2 me-auto">{i.name}</div><span class={`badge text-bg-${i.live ? 'danger' : 'primary'}`}>{i.incoming}</span></ListGroup.Item>)}
      </ListGroup>
    </div>
  </>
})
