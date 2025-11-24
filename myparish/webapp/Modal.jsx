const Modal = (props) => {
  const { t } = useTranslation()
  const { modalId, itemId } = props

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = document.querySelector('#form_item')
    
    axios.post('api/scheduled-put', form, { headers: { 'Content-Type': 'multipart/form-data' }}).then(() => {
      form.reset()
    })
    
    return false
  }

  useEffect(() => {
    if (!itemId) {
      return
    }
    
    const searchParams = new URLSearchParams()
    searchParams.append('id', itemId)
    axios.get(`api/scheduled?${searchParams.toString()}`).then((response) => {
      document.getElementById(`${modalId}InputDescription2`).value = 6
      alert(response.data['description'])
    })
  }, [itemId])

  return <div class="modal fade" id={modalId} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{t('label_scheduled')}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label={t('label_close')}></button>
        </div>
        <div class="modal-body">
          <form class="dane" id={`form_${modalId}`} onSubmit={handleSubmit}>
            <div class="form-group">
              <label for={`${modalId}InputDescription2`}>{t('label_description')}</label>
              <input type="text" class="form-control" id={`${modalId}InputDescription2`} aria-describedby="descriptionHelp" name="description" />
              <small id="descriptionHelp" class="form-text text-muted">{t('')}</small>
            </div>
            <div class="form-group">
              <label for="exampleInputScheduled2">{t('label_scheduled')}</label>
              <input type="datetime-local" class="form-control" id="exampleInputScheduled2" aria-describedby="schedulehHelp" name="scheduled" />
              <small id="scheduledHelp" class="form-text text-muted">{t('')}</small>
            </div>
            <div class="form-group">
              <label for="exampleInputValue1">{t('label_value')}</label>
              <input type="number" min="10.00" max="500" step="0.01" class="form-control" id="exampleInputValue1" aria-describedby="valueHelp" name="value" />
              <small id="valueHelp" class="form-text text-muted">{t('')}</small>
            </div>
            <div class="form-group">
              <label for="exampleInputNotes1">{t('notes')}</label>
              <input type="text" class="form-control" id="exampleInputNotes1" aria-describedby="notesHelp" name="notes" />
              <small id="notesHelp" class="form-text text-muted">{t('')}</small>
            </div>
            <div class="form-group">
              <label for="exampleInputId1">{t('label_id')}</label>
              <input type="hidden" class="form-control" id="exampleInputId1" aria-describedby="idHelp" name="id" value="web" />
              <small id="idHelp" class="form-text text-muted">{t('')}</small>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{t('label_cancel')}</button>
          <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">{t('label_save')}</button>
        </div>
      </div>
    </div>
  </div>
}
