const useParams = ReactRouterDOM.useParams
const useEffect = React.useEffect

const Reader = () => {
  const { t } = useTranslation()
  const { tenant } = useParams()
  const [currentWeek, setCurrentWeek] = useState([])

  const dayOfWeek = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela']

  useEffect(() => {
    const postData = {
      type: "msza"
    }
    axios.post('api/scheduled-week', postData, { headers: { 'Content-Type': 'multipart/form-data' }}).then((response) => {
      setCurrentWeek(response.data)
    })
  }, [tenant])

  return <>
    <header>
      <div class=" text-bg-dark collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4>{t('label_contact_title')}</h4>
              <p class="text-body-secondary">{t('label_contact_description')}</p>
            </div>
            <div class="col-sm-4 offset-md-1 py-4">
              <h4>{t('label_contact_subtitle')}</h4>
              <ul class="list-unstyled">
                <li>
                  <a href="mailto:test@test.pl" class="text-white">{t('label_emailus')}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-dark bg-dark shadow-sm">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center">
            <strong>{`${t('label_tenant')}: ${tenant}`}</strong>
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
        <p class="fs-5 col-md-8 mb-5">{t('label_reader_description')}</p>
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
                      <td>{e}</td>
                      <td>-</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </AccordionItem>
          <AccordionItem id="announcements" parent="accordionExample"></AccordionItem>
          <AccordionItem id="contact" parent="accordionExample"></AccordionItem>
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
