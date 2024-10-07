class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      source: null
    }
  }

  componentWillMount() {
    let self = this;
      let kraj = new URLSearchParams(new URL(window.location).search).get("lang");
      if (null == kraj) kraj = navigator.language;
      if (kraj.startsWith("pl")) kraj = "pl";
      axios.post("http://zakupy.ugu.pl/produkty" + "?lang=pl", { lang: 'test' }).then(function (response) {
        console.log(response)
        self.replace(<List properties={["produkt", "sklep", "cena", "dodano"]} list={response.data} expandable={true} replace={self.replace} back={self.back} />);
      })
  }
  
  replace = (source) => {
    this.setState({source: source});
  }
  
  back = () => {
    this.setState({source: <App />});
  }
  
  render() {
    return this.state.source
  }
}
