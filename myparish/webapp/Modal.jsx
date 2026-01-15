const Modal = React.memo((props) => {
  const { t } = useTranslation()
  const { modalId, itemId, type } = props

  const handleSubmit = (event) => {
    event.preventDefault()
    
    const form = document.querySelector(`#form_${modalId}`)
    axios.post(!itemId ? 'api/scheduled-cd' : 'api/scheduled', form, { headers: { 'Content-Type': 'multipart/form-data' }}).then((response) => {
      form.reset()
      console.debug(response.data)
    })
    
    return false
  }

  useEffect(() => {
    if (!itemId) {
      document.getElementById(`${modalId}InputType`).value = type
      return
    }
    
    const searchParams = new URLSearchParams()
    searchParams.append('id', itemId)
    axios.get(`api/scheduled?${searchParams.toString()}`).then((response) => {
      document.getElementById(`${modalId}InputId`).value = itemId
      document.getElementById(`${modalId}InputDescription`).value = response.data['description']
      document.getElementById(`${modalId}InputScheduled`).value = response.data['scheduled']
      document.getElementById(`${modalId}InputValue`).value = response.data['value']
      document.getElementById(`${modalId}InputNotes`).value = response.data['notes']
      document.getElementById(`${modalId}InputType`).value = response.data['type']
      console.debug(response.data)
    })
  }, [itemId])

  return <div class="modal fade" id={modalId} tabindex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id={`${modalId}Label`}>{t('label_scheduled')}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label={t('label_close')}></button>
        </div>
        <div class="modal-body">
          <form class="dane" id={`form_${modalId}`} onSubmit={handleSubmit} enctype="multipart/form-data">
            <div class="form-group">
              <label for={`${modalId}InputDescription`}>{t('label_description')}</label>
              <input type="text" class="form-control" id={`${modalId}InputDescription`} aria-describedby={`${modalId}HelpDescription`} name="description" />
              <small id={`${modalId}HelpDescription`} class="form-text text-muted">{t('help_description')}</small>
            </div>
            <div class="form-group">
              <label for={`${modalId}InputScheduled`}>{t('label_date')}</label>
              <input type="datetime-local" class="form-control" id={`${modalId}InputScheduled`} aria-describedby={`${modalId}HelpScheduled`} name="scheduled" />
              <small id={`${modalId}HelpScheduled`} class="form-text text-muted">{t('help_scheduled')}</small>
            </div>
            <div class="form-group">
              <label for={`${modalId}InputValue`}>{t('label_donation')}</label>
              <input type="number" min="10.00" max="500" step="0.01" class="form-control" id={`${modalId}InputValue`} aria-describedby={`${modalId}valueHelp`} name="value" />
              <small id={`${modalId}valueHelp`} class="form-text text-muted">{t('help_value')}</small>
            </div>
            <div class="form-group">
              <label for={`${modalId}InputNotes`}>{t('label_notes')}</label>
              <input type="text" class="form-control" id={`${modalId}InputNotes`} aria-describedby={`${modalId}HelpNotes`} name="notes" />
              <small id={`${modalId}HelpNotes`} class="form-text text-muted">{t('help_notes')}</small>
            </div>
            <div class="form-group">
              <input type="hidden" class="form-control" id={`${modalId}InputId`} aria-describedby={`${modalId}HelpId`} name="id" />
              <small id={`${modalId}HelpId`} class="form-text text-muted">{t('help_id')}</small>
            </div>
            <div class="form-group">
              <input type="hidden" class="form-control" id={`${modalId}InputType`} aria-describedby={`${modalId}HelpType`} name="type" />
              <small id={`${modalId}HelpType`} class="form-text text-muted">{t('help_type')}</small>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">{t('label_cancel')}</button>
          <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>{t('label_save')}</button>
        </div>
      </div>
    </div>
  </div>
})
