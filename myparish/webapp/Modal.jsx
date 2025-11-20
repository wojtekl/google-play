

const Modal = () => {

  const handleSubmit = (event) => {
    event.preventDefault()
    //const { handleClose } = this.props
    const form = document.querySelector('#form_item')
    axios.put(`scheduled.php`, form).then(() => {
      form.reset()
      //handleClose()
    })
    return false
  }

  return <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">{"newProduct"}</h5>
              <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form class="dane" id="form_item">
                <div class="form-group">
                  <label for="exampleInputNazwa1">{"name"}</label>
                  <input type="text" class="form-control" id="exampleInputNazwa1" aria-describedby="nazwaHelp" name="description" value={""} />
                  <small id="nazwaHelp" class="form-text text-muted">Upewnij się że produkt jeszcze nie istnieje</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputSklep1">{"store"}</label>
                  <input type="text" class="form-control" id="exampleInputSklep1" aria-describedby="sklepHelp" name="scheduled" />
                  <small id="sklepHelp" class="form-text text-muted">Sprawdź nazwę sklepu przy innych produktach</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputCena1">{"price"}</label>
                  <input type="text" class="form-control" id="exampleInputCena1" aria-describedby="cenaHelp" name="value" />
                  <small id="cenaHelp" class="form-text text-muted">Użyj kropki jako separatora</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputNotes1">{"notes"}</label>
                  <input type="text" class="form-control" id="exampleInputNotes1" aria-describedby="notesHelp" name="notes" />
                  <small id="notesHelp" class="form-text text-muted">Sprawdź nazwę sklepu przy innych produktach</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputId1">Id</label>
                  <input type="hidden" class="form-control" id="exampleInputId1" aria-describedby="idHelp" name="identyfikator" value="web" />
                  <small id="identyfikatorHelp" class="form-text text-muted">Generowany automatycznie</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputCoupon1">{"coupon"}</label>
                  <input type="checkbox" class="form-control" id="exampleInputCoupon1" aria-describedby="couponHelp" name="coupon" />
                  <small id="couponHelp" class="form-text text-muted">Cena z kartą</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputBulk1">{"bulk"}</label>
                  <input type="checkbox" class="form-control" id="exampleInputBulk1" aria-describedby="bulkHelp" name="bulk" />
                  <small id="couponHelp" class="form-text text-muted">Przy zakupie większej ilości</small>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{"cancel"}</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>{"save"}</button>
            </div>
          </div>
        </div>
      </div>
}
