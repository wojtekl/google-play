class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      source: (
        <div><button class="btn btn-primary" type="button" disabled>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        {localise.loading}
      </button>
          <script type="text/javascript">
            function red () {
              window.location.href = "http://rawcdn.githack.com/wojtekl/google-play/3f16147e64cf834b70f8b0a70cd3aad5e7e6feaa/shoppinglist/webapp/index.html?fbclid=IwY2xjawF3G6hleHRuA2FlbQIxMAABHbb0eyYlxn8PpEibaMxaZVk4fJ1FzbIqmv0-CkhqapnjRZQC1BYz7dHjwQ_aem_9zypv7gNAgvdFcQ80ntgLg";
            }
          </script>
          <p>Nie widzisz cen? Kliknij <a href="#app" onclick="red();">tutaj</a></p></div>
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
    axios.post(`http://zakupy.ugu.pl/produkty?lang=${lang}`, { lang: lang }).then(function (response) {
      self.replace(<List properties={["produkt", "sklep", "cena", "dodano"]} list={response.data} expandable={true} replace={self.replace} back={self.back} />);
    })
  }

  render() {
    return this.state.source
  }
}
