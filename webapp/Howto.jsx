const withTranslation = ReactI18next.withTranslation


class HowtoInner extends React.Component {
  render() {
    const { t } = this.props

    return <div class="container">
      <h1 class="text-body-emphasis">{t('header_install')}</h1>
      <p class="fs-5 col-md-8 mb-5">{t('description_install')}</p>
      <hr class="col-3 col-md-2 mb-5"></hr>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controlls="collapseOne">{t('accordion_header_iphone')}</button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div class="accordion-body"><strong>{t('accordion_intro_iphone')}</strong>{t('accordion_contd_iphone')}</div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controlls="collapseTwo">{t('accordion_header_android')}</button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body"><strong>{t('accordion_intro_android')}</strong>{t('accordion_contd_android')}</div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controlls="collapseThree">{t('accordion_header_windows')}</button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body"><strong>{t('accordion_intro_windows')}</strong>{t('accordion_contd_windows')}</div>
          </div>
        </div>
      </div>
    </div>
  }
}

const Howto = withTranslation(HowtoInner)