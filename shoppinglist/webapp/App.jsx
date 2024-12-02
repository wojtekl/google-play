class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      source: (
        <div><button class="btn btn-secondary" type="button" disabled>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        {localise.loading}
      </button><p>Nie widzisz cen? Kliknij <a href="https://pricey.wuaze.com" rel="noreferrer" referrerpolicy="no-referrer">tutaj</a></p></div>
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
    const self = this;
    const formData = new FormData();
    formData.append("selected", new URLSearchParams(new URL(window.location).search).get("selected"))
    axios.post(`produkty?lang=${lang}`, formData).then(function (response) {
      self.replace(<List properties={["produkt", "sklep", "cena", "dodano"]} list={response.data} expandable={true} replace={self.replace} back={self.back} />);
    })
  }

  render() {
    return this.state.source
  }
}
