const Modal = (props) => {
  const { t } = useTranslation()
  const { modalId, itemId } = props

  const handleSubmit = (event) => {
    event.preventDefault()
    alert('zapis')
    /*const form = document.querySelector('#form_submit')
    
    axios.post('api/scheduled-put', form, { headers: { 'Content-Type': 'multipart/form-data' }}).then(() => {
      form.reset()
    })*/
    
    return false
  }

  /*useEffect(() => {
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
  }, [itemId])*/

  return <div class="modal fade" id={modalId} tabindex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id={`${modalId}Label`}>{t('label_scheduled')}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label={t('label_close')}></button>
        </div>
        <div class="modal-body">
          <form class="dane" id="form_submit" onSubmit={handleSubmit}>
            <div class="form-group">
              <label for={`modalIdInputDescription`}>{t('label_description')}</label>
              <input type="text" class="form-control" id={`modalIdInputDescription`} aria-describedby={`modalIddescriptionHelp`} name="description" />
              <small id={`modalIddescriptionHelp`} class="form-text text-muted">{t('')}</small>
            </div>
            <div class="form-group">
              <label for={`modalIdInputScheduled`}>{t('label_scheduled')}</label>
              <input type="datetime-local" class="form-control" id={`modalIdInputScheduled`} aria-describedby={`modalIdschedulehHelp`} name="scheduled" />
              <small id={`modalIdschedulehHelp`} class="form-text text-muted">{t('')}</small>
            </div>
            <div class="form-group">
              <label for={`modalIdInputValue`}>{t('label_value')}</label>
              <input type="number" min="10.00" max="500" step="0.01" class="form-control" id={`modalIdInputValue`} aria-describedby={`modalIdvalueHelp`} name="value" />
              <small id={`modalIdvalueHelp`} class="form-text text-muted">{t('')}</small>
            </div>
            <div class="form-group">
              <label for={`modalIdInputNotes`}>{t('notes')}</label>
              <input type="text" class="form-control" id={`modalIdInputNotes`} aria-describedby={`modalIdnotesHelp`} name="notes" />
              <small id={`modalIdnotesHelp`} class="form-text text-muted">{t('')}</small>
            </div>
            <div class="form-group">
              <label for={`modalIdInputId`}>{t('label_id')}</label>
              <input type="hidden" class="form-control" id={`modalIdInputId`} aria-describedby={`modalIdIdHelp`} name="id" />
              <small id={`modalIdIdHelp`} class="form-text text-muted">{t('')}</small>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{t('label_cancel')}</button>
          <button type="submit" class="btn btn-primary">{t('label_save')}</button>
        </div>
      </div>
    </div>
  </div>
}
