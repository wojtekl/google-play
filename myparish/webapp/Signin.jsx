const Signin = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = document.querySelector('#form_submit')
    axios.post('api/signin', form).then((response) => {
      navigate('/manage')
    })
  }

  useEffect(() => {
    axios.get('api/signin').then((response) => {
      if (response.data) {
        store.dispatch({ type: 'tenant/set', payload: response.data })
        navigate('/manage')
      }
      console.debug(response.data)
    })
  }, [])
  
  return <div class="d-flex align-items-center py-4 bg-body-tertiary">
    <main class="form-signin w-100 m-auto" style={{maxWidth: '330px', padding: '1rem'}}>
      <form id="form_submit"  onSubmit={handleSubmit}>
        <h1 class="h3 mb-3 fw-normal">{t('label_please_sign_in')}</h1>
        <div class="form-floating">
          <input type="text" class="form-control" id="floatingInput" placeholder="demo" name="tenant" />
          <label for="floatingInput">{t('label_tenant')}</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder={t('label_password')} name="password" />
          <label for="floatingPassword">{t('label_password')}</label>
        </div>
        <div class="form-check text-start my-3">
          <input class="form-check-input" type="checkbox" value="remember-me" id="checkDefault" />
          <label class="form-check-label" for="checkDefault">{t('label_remember_me')}</label>
        </div>
        <button class="btn btn-primary w-100 py-2" type="submit">{t('label_sign_in')}</button>
        <p class="mt-5 mb-3 text-body-secondary">{t('label_copyright')}</p>
      </form>
    </main>
  </div>
}
