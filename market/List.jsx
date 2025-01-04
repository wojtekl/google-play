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
      filtered: list
    }
  }

  handleFilter = (event) => {
    const phrase = event.target.value.trim().toLowerCase()
    const { list } = this.state
    this.setState({ filtered: 2 < phrase.length ? list.filter(i => i.item.toLowerCase().includes(phrase)) : list })
  }

  render() {
    const { t, selected, properties, expandable, list } = this.props
    const { filtered } = this.state

    return (<>
      <Navbar expand="md">
        <Container>
          <Navbar.Brand><img src="https://github.com/wojtekl/google-play/raw/refs/heads/main/pricey/Pricey/app/src/main/res/mipmap-mdpi/ic_launcher_round.webp" width="30px" height="30px" alt="" />{t('title_app')}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="https://wlap.pl" rel="author">{t('nav_aboutus')}</Nav.Link>
              <Nav.Link href={t('url_privacy')} rel="privacy-policy">{t('nav_privacy')}</Nav.Link>
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
            <input class="form-control mr-sm-2" type="search" name="search" placeholder={t('label_search')} aria-label="Search" onKeyUp={this.handleFilter} maxlength="25" />
          </form>
        </Row>}
        <Row className="mt-3">
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
                    return <td> {row[property]} </td>
                  })}
                  {expandable && <td><Button variant="link" size="sm" onClick={this.handleClick} disabled={!enabled}><Badge bg={enabled ? 'primary' : 'secondary'}> -{'>'} </Badge></Button></td>}
                </tr>)
              })}
            </tbody>
          </Table>
        </Row>
      </Container>
    </>)
  }
}

const List = withTranslation()(ListInner)