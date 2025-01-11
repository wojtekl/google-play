const withTranslation = ReactI18next.withTranslation

const Badge = ReactBootstrap.Badge
const Breadcrumb = ReactBootstrap.Breadcrumb
const Nav = ReactBootstrap.Nav
const Navbar = ReactBootstrap.Navbar
const Row = ReactBootstrap.Row
const Table = ReactBootstrap.Table


const columns_list = ['item', 'store', 'price', 'posted']
const columns_details = ['store', 'price', 'posted', 'coupon', 'bulk']

class ListInner extends React.Component {

  state = {
    list: this.props.list,
    selected: null,
    filtered: list,
    show: false
  }

  handleClick = () => {
    const { replace, back } = this.props
    const { selected } = this.state
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.append('name', selected)
    axios.get(`item?${searchParams.toString()}`).then((response) => {
      replace(<List properties={columns_details} list={response.data} replace={replace} back={back} selected={selected} />)
    })
  }

  handleFilter = (event) => {
    const phrase = event.target.value.trim().toLowerCase()
    const { list } = this.state
    this.setState({ filtered: 2 < phrase.length ? list.filter(i => i.item.toLowerCase().includes(phrase)) : list })
  }

  handleSearch = (event) => {
    event.preventDefault()
    return false
  }

  handleChange = (event) => {
    const { list } = this.props
    const { selected } = this.state
    const selectedItem = !this.props.selected ? list.find(i => i.item === selected).id : selected
    store.dispatch({ type: event.target.checked ? 'selected/added' : 'selected/removed', payload: selectedItem })
  }

  handleCopy = () => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.append('selected', store.getState().value.join(','))
    window.location.href = `/?${searchParams.toString()}`
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
          <Navbar.Brand><img src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/pricey/Pricey/app/src/main/res/mipmap-mdpi/ic_launcher_round.webp" width="30px" height="30px" alt="" />{t('title_app')}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={this.handleShow}>{!selected ? t('button_new_product') : t('button_update_price')}</Nav.Link>
              {!isYourList ? <Nav.Link onClick={this.handleCopy}>{t('nav_yourlist')}</Nav.Link> : <Nav.Link href="/" rel="bookmark">{t('nav_home')}</Nav.Link>}
              <Nav.Link href="https://wlap.pl" rel="author">{t('nav_aboutus')}</Nav.Link>
              <Nav.Link href={t('url_privacy')} rel="privacy-policy">{t('nav_privacy')}</Nav.Link>
              <Nav.Link href="https://rb.gy/sqezhd" rel="external"><Image src={t('url_get')} style={{ maxHeight: "40px" }} /></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        {!selected && <Row className="mt-3">
          <form class="form-inline my-2" role="search" onSubmit={this.handleSearch}>
            <input class="form-control mr-sm-2" type="search" name="search" placeholder={t('label_search')} aria-label="Search" onKeyUp={this.handleFilter} maxlength="25" />
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
                  return (<th> {String(t(`label_${property}`)).toUpperCase()} </th>)
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
                    else if ('price' === property) {
                      return <td><NumberFormatter value={row[property]} /></td>
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
        <Modal item={selected} show={show} handleClose={this.handleClose} storeName={storeName} />
      </Container>
    </>)
  }
}

const List = withTranslation()(ListInner)