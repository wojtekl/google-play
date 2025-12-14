const useParams = ReactRouterDOM.useParams
const useEffect = React.useEffect

const Reader = () => {
  const { t } = useTranslation()
  const { tenant } = useParams()
  const [currentWeek, setCurrentWeek] = useState([])
  const [contact, setContact] = useState()
  const [departure, setDeparture] = useState([])
  const [settings, setSettings] = useState()

  const dayOfWeek = [
    { order: '2', name: t('label_monday')}, 
    { order: '3', name: t('label_tuesday')}, 
    { order: '4', name: t('label_wednesday')}, 
    { order: '5', name: t('label_thursday')}, 
    { order: '6', name: t('label_friday')}, 
    { order: '7', name: t('label_saturday')}, 
    { order: '1', name: t('label_sunday')}
  ]

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = document.querySelector(`#form_order`)
    
    axios.post('api/scheduled-cd', form, { headers: { 'Content-Type': 'multipart/form-data' }}).then((response) => {
      form.reset()
      console.debug(response.data)
    })
    
    return false
  }

  useEffect(() => {
    const searchParams = new URLSearchParams()
    searchParams.append('tenant', tenant)
    axios.get(`api/contact?${searchParams.toString()}`).then((response) => {
      setContact(response.data)
      console.debug(response.data)
    })
  }, [tenant])

  useEffect(() => {
    const postData = {
      tenant: tenant,
      type: "eucharystia",
      today: '2025-12-24' // new Date().toISOString().split('T')[0]
    }
    axios.post('api/scheduled-week', postData, { headers: { 'Content-Type': 'multipart/form-data' }}).then((response) => {
      setCurrentWeek(response.data)
      console.debug(response.data)
    })
  }, [tenant])

  useEffect(() => {
    const postData = {
      tenant: tenant,
      type: "departure",
      today: '2025-12-14' // new Date().toISOString().split('T')[0]
    }
    axios.post('api/scheduled-week', postData, { headers: { 'Content-Type': 'multipart/form-data' }}).then((response) => {
      setDeparture(response.data)
      console.debug(response.data)
    })
  }, [tenant])

  useEffect(() => {
    const searchParams = new URLSearchParams()
    searchParams.append('tenant', tenant)
    axios.get(`api/settings?${searchParams.toString()}`).then((response) => {
      setSettings(response.data)
      console.debug(response.data)
    })
  }, [tenant])

  return <>
    <header>
      <div class=" text-bg-dark collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4>{t('label_contact_title')}</h4>
              <p class="text-body-secondary">{`${contact?.street} ${contact?.number}`}</p>
              <p class="text-body-secondary">{`${contact?.city} ${contact?.postalcode}`}</p>
              <p class="text-body-secondary">{`${t('label_phone')}: ${contact?.phone}`}</p>
            </div>
            <div class="col-sm-4 offset-md-1 py-4">
              <h4>{t('label_contact_subtitle')}</h4>
              <ul class="list-unstyled">
                <li>
                  <a href={`mailto:${contact?.email}`} class="text-white">{t('label_emailus')}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-dark bg-dark shadow-sm">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center">
            <strong>{`${t('label_tenant')}: ${contact?.description}`}</strong>
          </a>
          <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
            aria-expanded="false" aria-label={t('label_toggle_navigation')}>
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </header>
    <main>
      <div class="container">
        <h1 class="text-body-emphasis">{t('label_reader_header')}</h1>
        <p class="fs-5 col-md-8 mb-5">{`${t('label_reader_description')}:${settings.schedule}`}</p>
        <hr class="col-3 col-md-2 mb-5"></hr>
        <div class="accordion" id="accordionExample">
          <AccordionItem id="scheduled" parent="accordionExample" show={true}>
            <div class="table-responsive small">
              <table class="table table-stripped table-sm">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">{t('label_scheduled')}</th>
                    <th scope="col">{t('label_description')}</th>
                  </tr>
                </thead>
                <tbody>
                  {dayOfWeek.map((e, i) => 
                    <tr>
                      <td>{i + 1}</td>
                      <td>{e.name}</td>
                      <td>{currentWeek.filter(f => f.dayOfWeek === e.order).map(g => <p>{`${g.time} ${g.description}`}</p>)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </AccordionItem>
          <AccordionItem id="announcements" parent="accordionExample"></AccordionItem>
          <AccordionItem id="order" parent="accordionExample">
            <form id="form_order">
              <fieldset>
                <legend>{t('label_order')}</legend>
                <div class="mb-3">
                  <label for="orderDescription" class="form-label">{t('label_description')}</label>
                  <input type="text" id="orderDescription" class="form-control" placeholder="" name="description" />
                </div>
                <div class="mb-3">
                  <label for="orderFrom" class="form-label">{t('label_from')}</label>
                  <input type="text" id="orderFrom" class="form-control" placeholder="" name="notes" />
                </div>
                <div class="mb-3">
                  <input type="hidden" id="orderTenant" class="form-control" placeholder="" name="tenant" value={tenant} />
                </div>
                <div class="mb-3">
                  <input type="hidden" id="orderType" class="form-control" placeholder="" name="type" value="eucharystia" />
                </div>
                <button type="submit" class="btn btn-primary" onClick={handleSubmit}>{t('label_submit')}</button>
              </fieldset>
            </form>
          </AccordionItem>
          <AccordionItem id="departure" parent="accordionExample" show={true}>
            <div class="table-responsive small">
              <table class="table table-stripped table-sm">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">{t('label_scheduled')}</th>
                    <th scope="col">{t('label_description')}</th>
                  </tr>
                </thead>
                <tbody>
                  {departure.map((e, i) => 
                    <tr>
                      <td>{i + 1}</td>
                      <td>{e.time}</td>
                      <td>{e.description}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </AccordionItem>
        </div>
      </div>
    </main>
    <footer class="text-body-secondary py-5">
      <div class="container">
        <p class="float-end mb-1">
          <a href={`#/${tenant}`}>{t('label_backtotop')}</a>
        </p>
        <p class="mb-1">{t('label_copyright')}</p>
        <p class="mb-0"><a href="/">{t('label_home')}</a></p>
      </div>
    </footer>
  </>
}
