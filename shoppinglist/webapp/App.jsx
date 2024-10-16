class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      source: (
        <div><button class="btn btn-secondary" type="button" disabled>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        {localise.loading}
      </button><p>Nie widzisz cen? Kliknij <a href="http://zakupy.ugu.pl/#app" rel="noreferrer" referrerpolicy="no-referrer">tutaj</a></p></div>
      )
    }
  }

  replace = (source) => {
    this.setState({ source: source });
  }

  back = () => {
    this.setState({ source: <App /> });
  }

  componentWillMount() {
    let self = this;
    axios.post(`produkty?lang=${lang}`, { lang: lang }).then(function (response) {
      self.replace(<List properties={["produkt", "sklep", "cena", "dodano"]} list={response.data} expandable={true} replace={self.replace} back={self.back} />);
    })
  }

  render() {
    return this.state.source
  }
}
