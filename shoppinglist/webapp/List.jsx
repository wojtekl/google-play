class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: this.props.list,
      back: this.props.back,
      selected: null,
      filtered: this.props.list,
    }
  }

  handleClick = () => {
    let self = this;
    axios.get(`produkt?lang=${lang}&nazwa=${this.state.selected}`).then(function (response) {
      self.props.replace(<List properties={["sklep", "cena", "dodano"]} list={response.data} replace={self.props.replace} back={self.props.back} selected={self.state.selected} />);
    })
  }

  handleFilter = (event) => {
    this.setState({ filtered: this.state.list.filter(i => i.produkt.toLowerCase().includes(event.target.value.toLowerCase())) });
  }
  
  render() {
    return (
      <div class="container">
        <div class="row mt-3">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <a class="nav-link active" href="#" data-toggle="modal" data-target="#exampleModal">{!this.props.selected ? localise.newProduct : localise.updatePrice}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://rb.gy/sqezhd">{localise.getTheApp}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="mailto:wleap.zhulp@slmails.com?subject=Chcę przekazać darowiznę na rozwój Pricey">{localise.support}</a>
            </li>
          </ul>
          {!this.props.selected && <form class="form-inline">
    <input class="form-control mr-sm-2" type="search" placeholder={localise.search} aria-label="Search" onKeyUp={this.handleFilter} />
  </form>}
        </div>
        <div class="row mt-3">
          {!!this.props.selected && <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href onClick={this.props.back}>{localise.back}</a></li>
              <li class="breadcrumb-item active" aria-current="page">{this.props.selected}</li>
            </ol>
          </nav>}
          <table class="table table-hover">
            <thead class="thead-dark">
              <tr>
                {this.props.properties.map(property => {
                  return (<th>{String(localise[property]).toUpperCase()}</th>)
                })}
                {this.props.expandable && <th>{localise.more.toUpperCase()}</th>}
              </tr>
            </thead>
            <tbody>
              {(!this.props.selected ? this.state.filtered : this.props.list).map(row => {
                return (<tr onMouseOver={() => this.setState({ selected: row[this.props.properties[0]] })}>
                  {this.props.properties.map(property => {
                    return <td>{"dodano" === property ? new Date(row[property]).toLocaleString(lang, { month: "short", day: "numeric" }) : row[property]}</td>
                  })}
                  {this.props.expandable && <td><span class="badge badge-secondary" onClick={this.handleClick}>-></span></td>}
                </tr>)
              })}
            </tbody>
          </table>
        </div>
        <Modal item={this.props.selected} />
      </div>
    );
  }
}
