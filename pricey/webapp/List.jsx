const withTranslation = ReactI18next.withTranslation

const Badge = ReactBootstrap.Badge
const Breadcrumb = ReactBootstrap.Breadcrumb
const Nav = ReactBootstrap.Nav
const Navbar = ReactBootstrap.Navbar
const Row = ReactBootstrap.Row
const Table = ReactBootstrap.Table


const columns_list = ['item', 'store', 'price', 'posted']
const columns_details = ['store', 'price', 'posted', 'coupon', 'bulk']
const t_columns = {
  item: "label_item",
  store: "label_store",
  price: "label_price",
  posted: "label_posted",
  coupon: "label_coupon",
  bulk: "label_bulk"
}

class ListInner extends React.Component {
  constructor(props) {
    super(props)

    const { list } = props
    this.state = {
      list: list,
      selected: null,
      filtered: list,
      show: false
    }
  }

  handleClick = () => {
    let self = this
    axios.get(`item?lang=${lang}&name=${this.state.selected}`).then((response) => {
      self.props.replace(<List properties={columns_details} list={response.data} replace={self.props.replace} back={self.props.back} selected={self.state.selected} />)
    })
  }

  handleFilter = (event) => {
    this.setState({ filtered: this.state.list.filter(i => i.item.toLowerCase().includes(event.target.value.toLowerCase())) })
  }

  handleChange = (event) => {
    const { selected, list } = this.props
    const selectedItem = !selected ? list.find(i => i.item === this.state.selected).id : this.state.selected
    store.dispatch({ type: event.target.checked ? 'selected/added' : 'selected/removed', payload: selectedItem })
  }

  handleCopy = () => {
    window.location.href = `/?${window.location.search.substring(1)}&selected=${store.getState().value.join(',')}`
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  render() {
    const { t, selected, properties, expandable, list, back } = this.props

    return (<>
      <Navbar expand="md">
      <Container>
        <Navbar.Brand><img src="https://github.com/wojtekl/google-play/raw/refs/heads/main/pricey/Pricey/app/src/main/res/mipmap-mdpi/ic_launcher_round.webp" width="30px" height="30px" />{t('title_app')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={this.handleShow}>{!selected ? t('button_new_product') : t('button_update_price')}</Nav.Link>
            <Nav.Link onClick={this.handleCopy}>{t('nav_yourlist')}</Nav.Link>
            <Nav.Link href="mailto:wleap.zhulp@slmails.com?subject=Chcę przekazać darowiznę na rozwój Pricey">{t('link_support')}</Nav.Link>
            <Nav.Link href="https://wlap.pl">{t('nav_aboutus')}</Nav.Link>
            <Nav.Link href={t('url_privacy')}>{t('nav_privacy')}</Nav.Link>
            <Nav.Link href="https://rb.gy/sqezhd"><Image src={t('url_get')} height="40px" /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Container>
        {!selected && <Row className="mt-3">
          <form class="form-inline my-2">
            <input class="form-control mr-sm-2" type="search" placeholder={t('label_search')} aria-label="Search" onKeyUp={this.handleFilter} />
          </form>
        </Row>}
        <Row className="mt-3">
          {!!selected && <Nav>
            <Breadcrumb>
              <Breadcrumb.Item><a href="javascript:;" onClick={back}> {t('button_back')} </a></Breadcrumb.Item>
              <Breadcrumb.Item active> {selected} </Breadcrumb.Item>
            </Breadcrumb>
          </Nav>}
          <Table hover size="sm">
            <thead class="table-dark">
              <tr>
                <th> X </th>
                {properties.map(property => {
                  return (<th> {String(t(t_columns[property])).toUpperCase()} </th>)
                })}
                {expandable && <th> {t('label_more').toUpperCase()} </th>}
              </tr>
            </thead>
            <tbody>
              {(!selected ? this.state.filtered : list).map(row => {
                return (<tr onMouseOver={() => this.setState({ selected: !selected ? row[properties[0]] : row['id'] })}>
                  <td><input type="checkbox" class="form-check-input" name="selected" checked={store.getState().value.includes(row['id'])} onChange={this.handleChange} /></td>
                  {properties.map(property => {
                    if ('posted' === property) {
                      return <td><DateFormatter timestamp={row[property]} /></td>
                    }
                    else if ('coupon' === property || 'bulk' === property) {
                      return <td><input type="checkbox" class="form-check-input" name={property} checked={"1" === row[property]} readonly /></td>
                    }
                    else {
                      return <td> {row[property]} </td>
                    }
                  })}
                  {expandable && <td><Button variant="link" size="sm" onClick={this.handleClick} disabled={this.state.selected !== row['item']}><Badge bg={this.state.selected === row['item'] ? 'primary' : 'secondary'}> -{'>'} </Badge></Button></td>}
                </tr>)
              })}
            </tbody>
          </Table>
        </Row>
        <Modal item={selected} show={this.state.show} handleClose={this.handleClose} store={itemStore} />
      </Container>
      </>)
  }
}

const List = withTranslation()(ListInner)