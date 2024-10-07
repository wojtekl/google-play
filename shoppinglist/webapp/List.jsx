class List extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      list: this.props.list,
      back: this.props.back,
      selected: null,
    }
  }
  
  handleClick = () => {
    let self = this;
    axios.get("http://zakupy.ugu.pl/produkt?nazwa=" + this.state.selected).then(function (response) {
      self.props.replace(<List properties={["sklep", "cena", "dodano"]} list={response.data} replace={self.props.replace} back={self.back} item={self.state.selected} />);
    })
  }
  render() {
    return (
<div class="container">
  <div class="row mt-3">
  <div class="col-sm-1"><a href="#app" class="btn btn-secondary" onClick={this.props.back}>{localise.powrot}</a></div>
    <div class="col-sm-1"><a href="#app" class="btn btn-success" data-toggle="modal" data-target="#exampleModal">{!this.props.item ? "Dodaj produkt" : "Dodaj cenę"}</a></div>
  </div>
  <div class="row mt-3">
    {!!this.props.item && <div>{this.props.item}</div>}
    <table class="table table-hover">
      <thead class="thead-dark">
        <tr>
          {this.props.properties.map(property => {
            return (<th>{String(localise[property]).toUpperCase()}</th>)
          })}
          {this.props.expandable && <th>{localise.wiecej.toUpperCase()}</th>}
        </tr>
      </thead>
      <tbody>
      {this.props.list.map(row => {
        return (<tr onMouseOver={() => this.setState({ selected: row[this.props.properties[0]] })}>
          {this.props.properties.map(property => {
            return <td>{row[property]}</td>
          })}
          {this.props.expandable && <td><span class="badge badge-secondary" onClick={this.handleClick}>...</span></td>}
          </tr>)
      })}
      </tbody>
    </table>
  </div>
  <Modal item={this.props.item} />
</div>
    );
  }
  
  back = () => {
    this.props.replace(<List properties={["produkt", "sklep", "cena", "dodano"]} list={this.state.list} expandable={true} replace={this.props.replace} back={this.state.back} item={null} />);
  }
}
