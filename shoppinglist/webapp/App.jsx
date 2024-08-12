class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      source: (
<div>
  <div class="jumbotron">
    <div class="container">
      <h1 class="display-5">Dowiedz się, w którym sklepie kupisz najtaniej!</h1>
      <p>Dołącz do grupy na facebooku i dowiedz się jak zainstalować apkę, jak zgłaszać ceny oraz przede wszystkim jak przeglądać ceny zgłoszone przez innych. Nie zapomnij też polecić apki znajomym, im nas (zgłaszających) więcej tym bardziej aktualne informacje o cenach mamy, a przede wszystkim tym lepiej możesz zaplanować swoje zakupy by wydać jak najmniej :))</p>
      <p>
        <a class="btn btn-primary btn-lg mr-3" href="https://rb.gy/fh4x0i" role="button">Zainstaluj apkę!</a>
        <a class="btn btn-primary btn-lg mr-3" href="https://www.facebook.com/groups/1122279075778345" role="button">Dołącz do grupy!</a>
      </p>
    </div>
  </div>
<div class="container">
  <div class="row">
    <div class="col-sm">
      <Card image="https://raw.githubusercontent.com/wojtekl/google-play/main/shoppinglist/ShoppingList/app/src/main/res/mipmap-xxxhdpi/ic_launcher.webp" title={localise.listaZakupow} description={localise.zobaczWktorym} source="/produkty" replace={this.replace} back={this.back} />
    </div>
    <div class="col-sm">
      <Card image="https://raw.githubusercontent.com/wojtekl/google-play/main/gooffline/GoOffline/app/src/main/res/mipmap-xxxhdpi/ic_launcher.webp" title={localise.goOffline} description="Wyłączanie sieci GSM" source="https://play.google.com/store/apps/details?id=github.wleap.gooffline.admob" replace={this.replace} back={this.back} />
    </div>
    <div class="col-sm">
      <Card image="https://raw.githubusercontent.com/wojtekl/google-play/main/talkietalkie/TalkieTalkie/app/src/main/res/mipmap-xxxhdpi/ic_launcher.webp" title={localise.talkieTalkie} description="WiFiDirect WalkieTalkie" source="https://play.google.com/store/apps/details?id=github.wleap.talkietalkie.admob" replace={this.replace} back={this.back} />
    </div>
  </div>
</div>
</div>
      )
    }
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
