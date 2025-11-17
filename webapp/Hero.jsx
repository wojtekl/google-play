const useNavigate = ReactRouterDOM.useNavigate
const useTranslation = ReactI18next.useTranslation

const Hero = (props) => {
  const { image, description, urlButtonOnline, small } = props
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleClick = React.useCallback((name) => {
    navigate(`${urlButtonOnline}`)
  }, [name])
  
  return <div class="px-4 py-5 my-5 text-center">
      <img class="d-block mx-auto mb-4" src={image} />
      <h1 class="display-5 fw-bold">{t(small)}</h1>
      <div class="col-lg-6 mx-auto">
        <p class="lead m-4">{t(description)}</p>
        <div class="d-grip gap-2 d-sm-flex justify-content-sm-center">
          <button type="button" class="btn btn-primary btn-lg px-4 gap-3" onClick={handleClick}>{t('button_gotit')}</button>
        </div>
      </div>
    </div>
}
