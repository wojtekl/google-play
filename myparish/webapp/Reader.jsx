const useParams = ReactRouterDOM.useParams
const useEffect = React.useEffect

const Reader = () => {
  const { t } = useTranslation()
  const { tenant } = useParams()
  const [currentWeek, setCurrentWeek] = useState([])

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
                <h4>{t('title_contact')}</h4>
                <p class="text-body-secondary">{t('description_contact')}</p>
              </div>
              <div class="col-sm-4 offset-md-1 py-4">
                <h4>{t('subtitle_contact')}</h4>
                <ul class="list-unstyled">
                  <li>
                    <a href="mailto:wleap.zhulp@slmails.com" class="text-white">{t('link_emailus')}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="navbar navbar-dark bg-dark shadow-sm">
          <div class="container">
            <a class="navbar-brand d-flex align-items-center">
              <strong>{t('title_home')}</strong>
            </a>
            <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
              aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </header>
      <main>
        <div class="container">
          <h1 class="text-body-emphasis">{t('header_install')}</h1>
          <p class="fs-5 col-md-8 mb-5">{t('description_install')}</p>
          <hr class="col-3 col-md-2 mb-5"></hr>
          <div class="accordion" id="accordionExample">
            <AccordionItem id="iphone" parent="accordionExample" show={true}>
    <h2>{`${t('label_tenant')}: ${tenant}`}</h2>
    <div class="table-responsive small">
      <table class="table table-stripped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{t('label_description')}</th>
            <th scope="col">{t('label_scheduled')}</th>
            <th scope="col">{t('label_value')}</th>
            <th scope="col">{t('label_notes')}</th>
          </tr>
        </thead>
        <tbody>
          {currentWeek.map((e, i) => {
            return <tr>
              <td>{i}</td>
              <td>{e['description']}</td>
              <td><DateFormatter timestamp={e['scheduled']} /></td>
              <td><NumberFormatter value={e['value']} /></td>
              <td>{e['notes']}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
            </AccordionItem>
            <AccordionItem id="android" parent="accordionExample"></AccordionItem>
            <AccordionItem id="windows" parent="accordionExample"></AccordionItem>
          </div>
        </div>
      </main>
      <footer class="text-body-secondary py-5">
        <div class="container">
          <p class="float-end mb-1">
            <a href="#">{t('button_backtotop')}</a>
          </p>
          <p class="mb-1">{t('description_copyright')}</p>
          <p class="mb-0"><a href="/">{t('button_home')}</a></p>
        </div>
      </footer>
    </>
}
