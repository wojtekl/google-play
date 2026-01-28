const withTranslation = ReactI18next.withTranslation

const Badge = ReactBootstrap.Badge
const Breadcrumb = ReactBootstrap.Breadcrumb
const Nav = ReactBootstrap.Nav
const Navbar = ReactBootstrap.Navbar
const Row = ReactBootstrap.Row
const Table = ReactBootstrap.Table


const columns_list = ['item', 'store', 'price', 'posted']
const columns_details = ['store', 'price', 'posted', 'coupon', 'bulk']

class ListInner extends React.PureComponent {

  state = {
    list: this.props.list,
    selected: null,
    filtered: this.props.list,
    show: false,
    lang: store.getState().lang
  }

  handleClick = () => {
    const { replace, back } = this.props
    const { selected, lang } = this.state
    const searchParams = new URLSearchParams()
    searchParams.append('lang', lang)
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
    const searchParams = new URLSearchParams()
    searchParams.append('selected', store.getState().value.join(','))
    window.location.href = `/?${searchParams.toString()}`
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  handleLang = () => {
    const { lang } = this.state
    const newLang = 'pl' === lang ? 'en' : 'pl'
    store.dispatch({ type: 'lang/set', payload: newLang })
    this.setState({ lang: newLang })
  }

  render() {
    const { selected, properties, expandable, list, back, t } = this.props
    const { filtered, show, lang } = this.state

    const isYourList = new URLSearchParams(new URL(window.location).search).has('selected')

    return (<>
      <div class="navbar navbar-expand-md">
      <div class="container">
        <div class="navbar-brand"><img src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/pricey/Pricey/app/src/main/res/mipmap-mdpi/ic_launcher_round.webp" width="30px" height="30px" alt="" />{t('title_app')}</div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#basic-navbar-nav" aria-controls="basic-navbar-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="basic-navbar-nav">
          <div className="navbar-nav me-auto">
            <div class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#confirmModal"}>{!selected ? t('button_new_product') : t('button_update_price')}</a></div>
            <div class="nav-item">{!isYourList ? <a class="nav-link active" aria-current="page" href="#/" onClick={this.handleCopy}>{t('nav_yourlist')}</a> : <a class="nav-link active" aria-current="page" href="/" rel="bookmark">{t('nav_home')}</a>}</div>
            <div class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{t('nav_more')}</a>
              <ul class="dropdown-menu">
                <li><a href="https://wlap.pl/" rel="author" class="dropdown-item">{t('nav_aboutus')}</a></li>
                <li><a href={t('url_privacy')} rel="privacy-policy" class="dropdown-item">{t('nav_privacy')}</a></li>
              </ul>
            </div>
            <div class="nav-item"><a class="nav-link" onClick={() => {}}>{t('nav_install')}</a></div>
            <div class="nav-item"><a class="nav-link" href="#" onClick={this.handleLang}>{'pl' === lang ? 'en' : 'pl'}</a></div>
          </div>
        </div>
      </div>
    </div>
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
                      return <td class="text-end">{ row['lowest'] === row[property] ? '!' : '' }<NumberFormatter value={row[property]} /></td>
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
        <Modal item={selected} show={show} handleClose={this.handleClose} storeName={storeName} day={day} />
      </Container>
    </>)
  }
}

const List = withTranslation()(ListInner)
