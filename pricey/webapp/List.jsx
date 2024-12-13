class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: this.props.list,
      selected: null,
      filtered: this.props.list,
    }
  }

  handleClick = () => {
    let self = this;
    axios.get(`produkt?lang=${lang}&nazwa=${this.state.selected}`).then(function (response) {
      self.props.replace(<List properties={["sklep", "cena", "dodano", "coupon", "bulk"]} list={response.data} replace={self.props.replace} back={self.props.back} selected={self.state.selected} />);
    })
  }

  handleFilter = (event) => {
    this.setState({ filtered: this.state.list.filter(i => i.produkt.toLowerCase().includes(event.target.value.toLowerCase())) });
  }

  handleChange = (event) => {
    const selected = !this.props.selected ? this.props.list.find(i => i.produkt === this.state.selected).id : this.state.selected;
    store.dispatch({type: event.target.checked ? 'selected/added' : 'selected/removed', payload: selected});
  }

  handleCopy = () => {
    const result = `https://pricey.wuaze.com/?selected=${store.getState().value.join(",")}`;
    navigator.clipboard.writeText(result);
  }
  
  render() {
    return (
      <Container>
        <Row className="mt-3">
          <Nav>
            <Nav.Item>
              <a class="nav-link active" href="index3.html#" data-toggle="modal" data-target="#exampleModal">{!this.props.selected ? localise.newProduct : localise.updatePrice}</a>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="https://rb.gy/sqezhd">{localise.getTheApp}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="mailto:wleap.zhulp@slmails.com?subject=Chcę przekazać darowiznę na rozwój Pricey">{localise.support}</Nav.Link>
            </Nav.Item>
          </Nav>
          {!this.props.selected && <Form>
            <input class="form-control mr-sm-2" type="search" placeholder={localise.search} aria-label="Search" onKeyUp={this.handleFilter} />
    <Button variant="outline-success" onClick={this.handleCopy}>{localise.copy}</Button>
  </Form>}
        </Row>
        <Row className="mt-3">
          {!!this.props.selected && <Nav>
            <Breadcrumb>
              <Breadcrumb.Item><a href="javascript:;" onClick={this.props.back}> {localise.back} </a></Breadcrumb.Item>
              <Breadcrumb.Item active> {this.props.selected} </Breadcrumb.Item>
            </Breadcrumb>
          </Nav>}
          <Table hover>
            <thead class="table-dark">
              <tr>
                <th>X</th>
                {this.props.properties.map(property => {
                  return (<th>{String(localise[property]).toUpperCase()}</th>)
                })}
                {this.props.expandable && <th>{localise.more.toUpperCase()}</th>}
              </tr>
            </thead>
            <tbody>
              {(!this.props.selected ? this.state.filtered : this.props.list).map(row => {
                return (<tr onMouseOver={() => this.setState({ selected: !this.props.selected ? row[this.props.properties[0]] : row["id"] })}>
                  <td><input type="checkbox" name="selected" checked={store.getState().value.includes(row["id"])} onChange={this.handleChange} /></td>
                  {this.props.properties.map(property => {
                    if ("dodano" === property) {
                      return <td>{new Date(`${row[property]}`).toLocaleString(lang, { month: "short", day: "numeric", timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })}</td>
                    }
                    else if ("coupon" === property || "bulk" === property) {
                      return <td><input type="checkbox" name={property} checked={"1" === row[property]} readonly /></td>
                    }
                    else {
                      return <td>{row[property]}</td>
                    }
                  })}
                  {this.props.expandable && <td><Badge bg="secondary" onClick={this.handleClick}>-{">"}</Badge></td>}
                </tr>)
              })}
            </tbody>
          </Table>
        </Row>
        <Modal item={this.props.selected} />
      </Container>
    );
  }
}
