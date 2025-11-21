

const Modal = () => {
  const { t } = useTranslation()

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = document.querySelector('#form_item')
    axios.post(`api/scheduled-put`, form, { headers: { 'Content-Type': 'multipart/form-data' }}).then(() => {
      form.reset()
    })
    return false
  }

  return <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">{t('label_scheduled')}</h5>
              <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form class="dane" id="form_item">
                <div class="form-group">
                  <label for="exampleInputDescription1">{t('label_description')}</label>
                  <input type="text" class="form-control" id="exampleInputDescription1" aria-describedby="descriptionHelp" name="description" />
                  <small id="descriptionHelp" class="form-text text-muted">Upewnij się że produkt jeszcze nie istnieje</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputScheduled1">{t('label_scheduled')}</label>
                  <input type="date" class="form-control" id="exampleInputScheduled1" aria-describedby="schedulehHelp" name="scheduled" />
                  <small id="scheduledHelp" class="form-text text-muted">Sprawdź nazwę sklepu przy innych produktach</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputValue1">{t('label_value')}</label>
                  <input type="text" class="form-control" id="exampleInputValue1" aria-describedby="valueHelp" name="value" />
                  <small id="valueHelp" class="form-text text-muted">Użyj kropki jako separatora</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputNotes1">{t('notes')}</label>
                  <input type="text" class="form-control" id="exampleInputNotes1" aria-describedby="notesHelp" name="notes" />
                  <small id="notesHelp" class="form-text text-muted">Sprawdź nazwę sklepu przy innych produktach</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputId1">Id</label>
                  <input type="hidden" class="form-control" id="exampleInputId1" aria-describedby="idHelp" name="identyfikator" value="web" />
                  <small id="identyfikatorHelp" class="form-text text-muted">Generowany automatycznie</small>
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
