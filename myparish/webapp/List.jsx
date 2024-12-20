const useState = React.useState


const List = () => {
  const { t } = useTranslation()

  const [filtered, setFiltered] = useState(clients.clients)

  const handleClick = (name) => {
    store.dispatch({ type: 'selected/added', payload: name })

    const navigate = useNavigate()
    navigate(`/selected/${name}`)
  }

  const handleFilter = (event) => {
    setFiltered(clients.clients.filter(i => i.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return <Container>
    <form class="form-inline my-2">
      <input class="form-control mr-sm-2" type="search" placeholder={t('label_search')} aria-label="Search" onKeyUp={handleFilter} />
    </form>
    <ListGroup>
      {filtered.map(i => <ListGroup.Item onClick={() => handleClick(i.name)}>{i.name}</ListGroup.Item>)}
    </ListGroup>
  </Container>
}