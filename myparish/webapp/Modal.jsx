const Modal = (props) => {
  const { t } = useTranslation()
  const { modalId, itemId } = props

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = document.querySelector(`#form_${modalId}`)
    alert('zapis')
    
    axios.post(!modalId ? 'api/scheduled-put' : 'api/scheduled', form, { headers: { 'Content-Type': 'multipart/form-data' }}).then(() => {
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
      document.getElementById(`${modalId}InputId`).value = response.data['id']
      document.getElementById(`${modalId}InputDescription`).value = response.data['description']
      document.getElementById(`${modalId}InputScheduled`).value = response.data['scheduled']
      document.getElementById(`${modalId}InputValue`).value = response.data['value']
      document.getElementById(`${modalId}InputNotes`).value = response.data['notes']
    })
  }, [itemId])

  return <div class="modal fade" id={modalId} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id={`${modalId}Label`}>{t('label_scheduled')}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label={t('label_close')}></button>
        </div>
        <div class="modal-body">
          <form class="dane" id={`form_${modalId}`} onSubmit={handleSubmit}>
            <div class="form-group">
              <label for={`${modalId}InputDescription`}>{t('label_description')}</label>
              <input type="text" class="form-control" id={`${modalId}InputDescription`} aria-describedby={`${modalId}descriptionHelp`} name="description" />
              <small id={`${modalId}descriptionHelp`} class="form-text text-muted">{t('')}</small>
            </div>
            <div class="form-group">
              <label for={`${modalId}InputScheduled`}>{t('label_scheduled')}</label>
              <input type="datetime-local" class="form-control" id={`${modalId}InputScheduled`} aria-describedby={`${modalId}schedulehHelp`} name="scheduled" />
              <small id={`${modalId}schedulehHelp`} class="form-text text-muted">{t('')}</small>
            </div>
            <div class="form-group">
              <label for={`${modalId}InputValue`}>{t('label_value')}</label>
              <input type="number" min="10.00" max="500" step="0.01" class="form-control" id={`${modalId}InputValue`} aria-describedby={`${modalId}valueHelp`} name="value" />
              <small id={`${modalId}valueHelp`} class="form-text text-muted">{t('')}</small>
            </div>
            <div class="form-group">
              <label for={`${modalId}InputNotes`}>{t('notes')}</label>
              <input type="text" class="form-control" id={`${modalId}InputNotes`} aria-describedby={`${modalId}notesHelp`} name="notes" />
              <small id={`${modalId}notesHelp`} class="form-text text-muted">{t('')}</small>
            </div>
            <div class="form-group">
              <label for={`${modalId}InputId`}>{t('label_id')}</label>
              <input type="hidden" class="form-control" id={`${modalId}InputId`} aria-describedby={`${modalId}idHelp`} name="id" />
              <small id={`${modalId}idHelp`} class="form-text text-muted">{t('')}</small>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">{t('label_cancel')}</button>
          <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">{t('label_save')}</button>
        </div>
      </div>
    </div>
  </div>
}
