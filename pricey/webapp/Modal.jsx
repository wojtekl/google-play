const withTranslation = ReactI18next.withTranslation

const BModal = ReactBootstrap.Modal


class ModalInner extends React.Component {

  handleClick = (event) => {
    event.preventDefault()
    const { handleClose } = this.props
    const form = document.querySelector('#form_item')
    axios.post(`item?lang=${lang}`, form, { headers: { 'Content-Type': 'multipart/form-data' } }).then(() => {
      form.reset()
      handleClose()
    })
    return false
  }

  render() {
    const { show, handleClose, t, item, storeName } = this.props

    return (
      <BModal id="exampleModal" show={show} size="sm" aria-labelledby="exampleModalLabel" onHide={handleClose} centered>
        <BModal.Header closeButton>
          <BModal.Title> {!item ? t('button_new_product') : `${t('label_item')}: ${item}`} </BModal.Title>
        </BModal.Header>
        <BModal.Body>
          <form id="form_item" onsubmit={this.handleClick}>
            <div class="form-group">
              <label for="exampleInputName1">{t('label_name')}</label>
              <input type="text" class="form-control" id="exampleInputName1" aria-describedby="nameHelp" name="name" value={item} required minlength="5" maxlength="100" />
              <small id="nameHelp" class="form-text text-muted"> Upewnij się że produkt jeszcze nie istnieje </small>
            </div>
            <div class="form-group">
              <label for="exampleInputStore1">{t('label_store')}</label>
              <input type="text" class="form-control" id="exampleInputStore1" aria-describedby="storeHelp" name="store" value={storeName} required maxlength="50" />
              <small id="storeHelp" class="form-text text-muted"> Sprawdź nazwę sklepu przy innych produktach </small>
            </div>
            <div class="form-group">
              <label for="exampleInputPrice1">{t('label_price')}</label>
              <input type="number" min="0.05" max="500" step="0.01" class="form-control" id="exampleInputPrice1" aria-describedby="priceHelp" name="price" required />
              <small id="priceHelp" class="form-text text-muted"> Użyj kropki jako separatora </small>
            </div>
            <div class="form-group">
              <label for="exampleInputId1"> Id </label>
              <input type="hidden" class="form-control" id="exampleInputId1" aria-describedby="idHelp" name="identyfikator" value="web" />
              <small id="identyfikatorHelp" class="form-text text-muted"> Generowany automatycznie </small>
            </div>
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id="exampleInputCoupon1" aria-describedby="couponHelp" name="coupon" />
              <label for="exampleInputCoupon1" class="form-check-label">{t('label_coupon')}</label>
              <small id="couponHelp" class="form-text text-muted"> Cena z kartą </small>
            </div>
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id="exampleInputBulk1" aria-describedby="bulkHelp" name="bulk" />
              <label for="exampleInputBulk1" class="form-check-label">{t('label_bulk')}</label>
              <small id="couponHelp" class="form-text text-muted"> Przy zakupie większej ilości </small>
            </div>
          </form>
        </BModal.Body>
        <BModal.Footer>
          <Button variant="secondary" onClick={handleClose}> {t('button_cancel')} </Button>
          <Button type="submit" variant="primary"> {t('button_save')} </Button>
        </BModal.Footer>
      </BModal>
    )
  }
}

const Modal = withTranslation()(ModalInner)