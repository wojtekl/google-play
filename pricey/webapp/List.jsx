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
    const { replace, back } = this.props
    const { selected } = this.state
    axios.get(`item?lang=${lang}&name=${selected}`).then((response) => {
      replace(<List properties={columns_details} list={response.data} replace={replace} back={back} selected={selected} />)
    })
  }

  handleFilter = (event) => {
    const phrase = event.target.value.trim().toLowerCase()
    if (1 !== phrase.length) {
      const { list } = this.state
      this.setState({ filtered: list.filter(i => i.item.toLowerCase().includes(phrase)) })
    }
  }

  handleChange = (event) => {
    const { list } = this.props
    const { selected } = this.state
    const selectedItem = !this.props.selected ? list.find(i => i.item === selected).id : selected
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
    const { filtered, show } = this.state

    const isYourList = new URLSearchParams(new URL(window.location).search).has('selected')

    return (<>
      <Navbar expand="md">
        <Container>
          <Navbar.Brand><img src="https://github.com/wojtekl/google-play/raw/refs/heads/main/pricey/Pricey/app/src/main/res/mipmap-mdpi/ic_launcher_round.webp" width="30px" height="30px" alt="" />{t('title_app')}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={this.handleShow}>{!selected ? t('button_new_product') : t('button_update_price')}</Nav.Link>
              {!isYourList ? <Nav.Link onClick={this.handleCopy}>{t('nav_yourlist')}</Nav.Link> : <Nav.Link href="/" rel="bookmark">{t('nav_home')}</Nav.Link>}
              <Nav.Link href="https://wlap.pl" rel="author">{t('nav_aboutus')}</Nav.Link>
              <Nav.Link href={t('url_privacy')} rel="privacy-policy">{t('nav_privacy')}</Nav.Link>
              <Nav.Link href="https://rb.gy/sqezhd" rel="external"><Image src={t('url_get')} style={{maxHeight: "40px"}} /></Nav.Link>
              <Nav.Link disabled>
                <p>
                  <a href="https://achecks.org/checker/index.php?uri=referer&gid=WCAG2-AA">
                    <img src="https://achecks.org/images/icon_W2_aa.jpg" alt="WCAG 2.0 (Level AA)" height="32" width="102" />
                  </a>
                </p>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        {!selected && <Row className="mt-3">
          <form class="form-inline my-2" role="search">
            <input class="form-control mr-sm-2" type="search" placeholder={t('label_search')} aria-label="Search" onKeyUp={this.handleFilter} maxlength="25" />
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
              {(!selected ? filtered : list).map(row => {
                const enabled = this.state.selected === row['item']
                return (<tr onMouseOver={() => this.setState({ selected: !selected ? row[properties[0]] : row['id'] })}>
                  <td><input type="checkbox" class="form-check-input" name="selected" checked={store.getState().value.includes(row['id'])} onChange={this.handleChange} aria-label="Select" /></td>
                  {properties.map(property => {
                    if ('posted' === property) {
                      return <td><DateFormatter timestamp={row[property]} /></td>
                    }
                    else if ('coupon' === property || 'bulk' === property) {
                      return <td><input type="checkbox" class="form-check-input" name={property} checked={"1" === row[property]} readonly aria-label={property} /></td>
                    }
                    else {
                      return <td> {row[property]} </td>
                    }
                  })}
                  {expandable && <td><Button variant="link" size="sm" onClick={this.handleClick} disabled={!enabled}><Badge bg={enabled ? 'primary' : 'secondary'}> -{'>'} </Badge></Button></td>}
                </tr>)
              })}
            </tbody>
          </Table>
        </Row>
        <Modal item={selected} show={show} handleClose={this.handleClose} store={itemStore} />
      </Container>
    </>)
  }
}

const List = withTranslation()(ListInner)