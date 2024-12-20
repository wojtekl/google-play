class List extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      filtered: clients.clients
    }
  }

  handleClick = (name) => {
    store.dispatch({ type: 'selected/added', payload: name })

    const navigate = useNavigate()
    navigate(`/selected/${name}`)
  }

  handleFilter = (event) => {
    this.setState({ filtered: clients.clients.filter(i => i.name.toLowerCase().includes(event.target.value.toLowerCase())) })
  }

  render() {
    return <Container>
  <form class="form-inline my-2">
    <input class="form-control mr-sm-2" type="search" placeholder={t('label_search')} aria-label="Search" onKeyUp={this.handleFilter} />
  </form>
  <ListGroup>
    {this.state.filtered.map(i => <ListGroup.Item onClick={() => this.handleClick(i.name)}>{i.name}</ListGroup.Item>)}
  </ListGroup>
</Container>
  }
}