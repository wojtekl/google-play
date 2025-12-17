const VisitModal = (props) => {
  const { t } = useTranslation()
  const { modalId } = props

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = document.querySelector(`#form_${modalId}`)
    
    axios.post('api/visit-cd', form, { headers: { 'Content-Type': 'multipart/form-data' }}).then((response) => {
      console.debug(response.data)
      form.reset()
    })
    
    return false
  }

  return <div class="modal fade" id={modalId} tabindex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id={`${modalId}Label`}>{t('label_visit')}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label={t('label_close')}></button>
        </div>
        <div class="modal-body">
          <form class="dane" id={`form_${modalId}`} onSubmit={handleSubmit}>
            <div class="form-group">
              <label for={`${modalId}InputFirstname`}>{t('label_firstname')}</label>
              <input type="text" class="form-control" id={`${modalId}InputFirstname`} aria-describedby={`${modalId}HelpFirstname`} name="firstname" />
              <small id={`${modalId}HelpFirstname`} class="form-text text-muted">{t('label_help_firstname')}</small>
            </div>
            <div class="form-group">
              <label for={`${modalId}InputSurname`}>{t('label_surname')}</label>
              <input type="text" class="form-control" id={`${modalId}InputSurname`} aria-describedby={`${modalId}HelpSurname`} name="surname" />
              <small id={`${modalId}HelpSurname`} class="form-text text-muted">{t('label_help_surname')}</small>
            </div>
            <div class="form-group">
              <label for={`${modalId}InputStreet`}>{t('label_street')}</label>
              <input type="text" class="form-control" id={`${modalId}InputStreet`} aria-describedby={`${modalId}HelpStreet`} name="street" />
              <small id={`${modalId}HelpStreet`} class="form-text text-muted">{t('label_help_street')}</small>
            </div>
            <div class="form-group">
              <label for={`${modalId}InputNumber`}>{t('label_number')}</label>
              <input type="text" class="form-control" id={`${modalId}InputNumber`} aria-describedby={`${modalId}HelpNumber`} name="number" />
              <small id={`${modalId}HelpNumber`} class="form-text text-muted">{t('label_help_number')}</small>
            </div>
            <div class="form-group">
              <label for={`${modalId}InputCity`}>{t('label_city')}</label>
              <input type="text" class="form-control" id={`${modalId}InputCity`} aria-describedby={`${modalId}HelpCity`} name="city" />
              <small id={`${modalId}HelpCity`} class="form-text text-muted">{t('label_help_city')}</small>
            </div>
            <div class="form-group">
              <label for={`${modalId}InputDonation`}>{t('label_donation')}</label>
              <input type="number" min="10.00" max="500" step="0.01" class="form-control" id={`${modalId}InputDonation`} aria-describedby={`${modalId}HelpDonation`} name="donation" />
              <small id={`${modalId}HelpDonation`} class="form-text text-muted">{t('label_help_donation')}</small>
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
}
