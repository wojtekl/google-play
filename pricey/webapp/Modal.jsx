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

    return (<>
      <Modal show={show} onHide={handleClose} centered fullscreen>
            <Modal.Header closeButton>
              <Modal.Title>{!this.props.item ? localise.newProduct : `${localise.produkt}: ${this.props.item}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>teeeeeeeeeeeeeest</Modal.Body>
            <Modal.Footer>
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>{localise.cancel}</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.handleClick}>{localise.save}</button>
            </Modal.Footer>
      </Modal>
      </>
    );
  }
}
