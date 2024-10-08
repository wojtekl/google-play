class Modal extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      item: this.props.item
    }
  }
  
  handleClick = () => {
    let self = this;
      let kraj = new URLSearchParams(new URL(window.location).search).get("lang");
      if (null == kraj) kraj = navigator.language;
      if (kraj.startsWith("pl")) kraj = "pl";
      axios.post('http:/zakupy.ugu.pl/produkt?', $('form.dane').serialize(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) { })
      $('form.dane').trigger('reset')
  }
  render() {
    return (
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Nowy produkt</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form class="dane">
  <div class="form-group">
    <label for="exampleInputNazwa1">Nazwa</label>
    <input type="text" class="form-control" id="exampleInputNazwa1" aria-describedby="nazwaHelp" name="nazwa" value={this.props.item}/>
    <small id="nazwaHelp" class="form-text text-muted">Upewnij się że produkt jeszcze nie istnieje</small>
  </div>
  <div class="form-group">
    <label for="exampleInputSklep1">Sklep</label>
    <input type="text" class="form-control" id="exampleInputSklep1" aria-describedby="sklepHelp" name="sklep"/>
    <small id="sklepHelp" class="form-text text-muted">Sprawdź nazwę sklepu przy innych produktach</small>
  </div>
<div class="form-group">
    <label for="exampleInputCena1">Cena</label>
    <input type="text" class="form-control" id="exampleInputCena1" aria-describedby="cenaHelp" name="cena"/>
    <small id="cenaHelp" class="form-text text-muted">Użyj kropki jako separatora</small>
  </div>
<div class="form-group">
    <label for="exampleInputId1">Id</label>
    <input type="hidden" class="form-control" id="exampleIdCena1" aria-describedby="idHelp" name="identyfikator" value="web"/>
    <small id="identyfikatorHelp" class="form-text text-muted">Generowany automatycznie</small>
  </div>
</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Zaniechaj</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.handleClick}>Zachowaj</button>
      </div>
    </div>
  </div>
</div>
    );
  }
}
