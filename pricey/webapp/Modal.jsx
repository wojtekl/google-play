class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.item
    }
  }

  handleClick = () => {
    axios.post(`produkt?lang=${lang}`, $('form.dane').serialize(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) { })
    $('form.dane').trigger('reset')
  }
  render() {
    const { show, handleClose } = this.props

    return (
      <Modal show={show} id="exampleModal" onHide={handleClose} fullscreen>
            <Modal.Header closeButton>
              <Modal.Title>{!this.props.item ? localise.newProduct : `${localise.produkt}: ${this.props.item}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <div class="form-group">
                  <label for="exampleInputNazwa1">{localise.name}</label>
                  <input type="text" class="form-control" id="exampleInputNazwa1" aria-describedby="nazwaHelp" name="nazwa" value={this.props.item} />
                  <small id="nazwaHelp" class="form-text text-muted">Upewnij się że produkt jeszcze nie istnieje</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputSklep1">{localise.store}</label>
                  <input type="text" class="form-control" id="exampleInputSklep1" aria-describedby="sklepHelp" name="sklep" />
                  <small id="sklepHelp" class="form-text text-muted">Sprawdź nazwę sklepu przy innych produktach</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputCena1">{localise.price}</label>
                  <input type="text" class="form-control" id="exampleInputCena1" aria-describedby="cenaHelp" name="cena" />
                  <small id="cenaHelp" class="form-text text-muted">Użyj kropki jako separatora</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputId1">Id</label>
                  <input type="hidden" class="form-control" id="exampleInputId1" aria-describedby="idHelp" name="identyfikator" value="web" />
                  <small id="identyfikatorHelp" class="form-text text-muted">Generowany automatycznie</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputCoupon1">{localise.coupon}</label>
                  <input type="checkbox" class="form-control" id="exampleInputCoupon1" aria-describedby="couponHelp" name="coupon" />
                  <small id="couponHelp" class="form-text text-muted">Cena z kartą</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputBulk1">{localise.bulk}</label>
                  <input type="checkbox" class="form-control" id="exampleInputBulk1" aria-describedby="bulkHelp" name="bulk" />
                  <small id="couponHelp" class="form-text text-muted">Przy zakupie większej ilości</small>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>{localise.cancel}</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.handleClick}>{localise.save}</button>
            </Modal.Footer>
      </Modal>
    );
  }
}
