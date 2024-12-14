const withTranslation = ReactI18next.withTranslation

const Badge = ReactBootstrap.Badge
const Breadcrumb = ReactBootstrap.Breadcrumb
const Nav = ReactBootstrap.Nav
const Row = ReactBootstrap.Row
const Table = ReactBootstrap.Table


class ListInner extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      list: this.props.list,
      selected: null,
      filtered: this.props.list,
      show: false
    }
  }

  handleClick = () => {
    let self = this
    axios.get(`produkt?lang=${lang}&nazwa=${this.state.selected}`).then(function (response) {
      self.props.replace(<List properties={['sklep', 'cena', 'dodano', 'coupon', 'bulk']} list={response.data} replace={self.props.replace} back={self.props.back} selected={self.state.selected} />)
    })
  }

  handleFilter = (event) => {
    this.setState({ filtered: this.state.list.filter(i => i.produkt.toLowerCase().includes(event.target.value.toLowerCase())) })
  }

  handleChange = (event) => {
    const selected = !this.props.selected ? this.props.list.find(i => i.produkt === this.state.selected).id : this.state.selected
    store.dispatch({ type: event.target.checked ? 'selected/added' : 'selected/removed', payload: selected })
  }

  handleCopy = () => {
    const result = `https://pricey.wuaze.com/?selected=${store.getState().value.join(',')}`
    navigator.clipboard.writeText(result)
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  render() {
    const { t } = this.props

    return (
      <Container>
        <Row className="mt-3">
          <Nav>
            <Nav.Item>
              <Button variant="primary" onClick={this.handleShow}> {!this.props.selected ? t('button_new_product') : t('button_update_price')} </Button>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="https://rb.gy/sqezhd"> {t('link_get_the_app')} </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="mailto:wleap.zhulp@slmails.com?subject=Chcę przekazać darowiznę na rozwój Pricey"> {t('link_support')} </Nav.Link>
            </Nav.Item>
          </Nav>
          {!this.props.selected && <form class="form-inline my-2">
            <input class="form-control mr-sm-2" type="search" placeholder={t('label_search')} aria-label="Search" onKeyUp={this.handleFilter} />
            <Button variant="outline-success" onClick={this.handleCopy}> {t('button_copy')} </Button>
          </form>}
        </Row>
        <Row className="mt-3">
          {!!this.props.selected && <Nav>
            <Breadcrumb>
              <Breadcrumb.Item><a href="javascript:;" onClick={this.props.back}> {t('button_back')} </a></Breadcrumb.Item>
              <Breadcrumb.Item active> {this.props.selected} </Breadcrumb.Item>
            </Breadcrumb>
          </Nav>}
          <Table hover>
            <thead class="table-dark">
              <tr>
                <th> X </th>
                {this.props.properties.map(property => {
                  return (<th> {String(localise[property]).toUpperCase()} </th>)
                })}
                {this.props.expandable && <th> {t('label_more').toUpperCase()} </th>}
              </tr>
            </thead>
            <tbody>
              {(!this.props.selected ? this.state.filtered : this.props.list).map(row => {
                return (<tr onMouseOver={() => this.setState({ selected: !this.props.selected ? row[this.props.properties[0]] : row['id'] })}>
                  <td><input type="checkbox" class="form-check-input" name="selected" checked={store.getState().value.includes(row['id'])} onChange={this.handleChange} /></td>
                  {this.props.properties.map(property => {
                    if ('dodano' === property) {
                      return <td> {<DateFormatter timestamp={row[property]} />} </td>
                    }
                    else if ('coupon' === property || 'bulk' === property) {
                      return <td><input type="checkbox" class="form-check-input" name={property} checked={"1" === row[property]} readonly /></td>
                    }
                    else {
                      return <td> {row[property]} </td>
                    }
                  })}
                  {this.props.expandable && <td><Badge bg="secondary" onClick={this.handleClick}> -{'>'} </Badge></td>}
                </tr>)
              })}
            </tbody>
          </Table>
        </Row>
        <Modal item={this.props.selected} show={this.state.show} handleClose={this.handleClose} />
      </Container>
    )
  }
}

const List = withTranslation()(ListInner)