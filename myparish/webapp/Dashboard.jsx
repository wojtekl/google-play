const Dashboard = React.memo(() => {
  const { t } = useTranslation()
  
  const [tenant, setTenant] = useState(store.getState().tenant)
  const [contact, setContact] = useState()
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    const searchParams = new URLSearchParams()
    searchParams.append('tenant', tenant)
    axios.get(`api/contact?${searchParams.toString()}`).then((response) => {
      setContact(response.data)
      document.getElementById('contactDescription').value = response.data.description
      document.getElementById('contactStreet').value = response.data.street
      document.getElementById('contactNumber').value = response.data.number
      document.getElementById('contactCity').value = response.data.city
      document.getElementById('contactPostalcode').value = response.data.postalcode
      document.getElementById('contactEmail').value = response.data.email
      document.getElementById('contactPhone').value = response.data.phone
      document.getElementById('contactIban').value = response.data.iban
    })
  }, [tenant])

  const handleDisabled = React.useCallback(() => {
    setDisabled(!disabled)
  }, [])

  const handleSubmit = React.useCallback((event) => {
    event.preventDefault()
    
    const form = document.querySelector(`#form_contact`)
    axios.post('api/contact', form, { headers: { 'Content-Type': 'multipart/form-data' }}).then((response) => {
      console.debug(response.data)
    })
    
    return false
  }, [])
  
  return <>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">{t('label_dashboard')}</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button type="button" class="btn btn-sm btn-outline-secondary" onClick={handleDisabled}>{ disabled ? <i class="bi bi-unlock"></i> : <i class="bi bi-lock"></i> }</button>
        </div>
      </div>
    </div>
    <form id="form_contact" enctype="multipart/form-data">
      <fieldset disabled={disabled}>
        <legend>{t('label_contact')}</legend>
        <div class="mb-3">
          <label for="contactDescription" class="form-label">{t('label_description')}</label>
          <input type="text" id="contactDescription" class="form-control" placeholder={contact?.description} name="description" />
        </div>
        <div class="mb-3">
          <label for="contactStreet" class="form-label">{t('label_street')}</label>
          <input type="text" id="contactStreet" class="form-control" placeholder={contact?.street} name="street" />
        </div>
        <div class="mb-3">
          <label for="contactNumber" class="form-label">{t('label_number')}</label>
          <input type="text" id="contactNumber" class="form-control" placeholder={contact?.number} name="number" />
        </div>
        <div class="mb-3">
          <label for="contactCity" class="form-label">{t('label_city')}</label>
          <input type="text" id="contactCity" class="form-control" placeholder={contact?.city} name="city" />
        </div>
        <div class="mb-3">
          <label for="contactPostalcode" class="form-label">{t('label_postalcode')}</label>
          <input type="text" id="contactPostalcode" class="form-control" placeholder={contact?.postalcode} name="postalcode" />
        </div>
        <div class="mb-3">
          <label for="contactEmail" class="form-label">{t('label_email')}</label>
          <input type="email" id="contactEmail" class="form-control" placeholder={contact?.email} name="email" />
        </div>
        <div class="mb-3">
          <label for="contactPhone" class="form-label">{t('label_phone')}</label>
          <input type="tel" id="contactPhone" class="form-control" placeholder={contact?.phone} name="phone" />
        </div>
        <div class="mb-3">
          <label for="contactIban" class="form-label">{t('label_iban')}</label>
          <input type="text" id="contactIban" class="form-control" maxlength="28" placeholder={contact?.iban} name="iban" />
        </div>
        { !disabled && <button type="submit" class="btn btn-primary" onClick={handleSubmit}>{t('label_submit')}</button> }
      </fieldset>
    </form>
  </>
})
