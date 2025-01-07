const withTranslation = ReactI18next.withTranslation


class HowtoInner extends React.Component {
  render() {
    const { t } = this.props

    const gallery = 'https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/webapp/'

    return <div class="container">
      <h1 class="text-body-emphasis">{t('header_install')}</h1>
      <p class="fs-5 col-md-8 mb-5">{t('description_install')}</p>
      <hr class="col-3 col-md-2 mb-5"></hr>
      <div class="accordion" id="accordionExample">
        <AccordionItem id="iphone" parent="accordionExample">
          <div class="col-md-9 col-sm-6">
            <strong>{t('accordion_intro_iphone')}</strong>{t('accordion_contd_iphone')}
          </div>
          <div class="col-md-3 col-sm-6">
            <Carousel id="iphone" gallery={gallery} images={['1.png', '2.png', '3.png', '4.png']} />
          </div>
        </AccordionItem>
        <AccordionItem id="android" parent="accordionExample">
          <div class="col-md-3 col-sm-6">
            <Carousel id="android" gallery={gallery} images={['1.png', '2.png', '3.png', '4.png']} />
          </div>
          <div class="col-md-9 col-sm-6">
            <strong>{t('accordion_intro_android')}</strong>{t('accordion_contd_android')}
          </div>
        </AccordionItem>
        <AccordionItem id="windows" parent="accordionExample">
          <div class="col-md-6 col-sm-6">
            <strong>{t('accordion_intro_windows')}</strong>{t('accordion_contd_windows')}
          </div>
          <div class="col-md-6 col-sm-6">
            <Carousel id="windows" gallery={gallery} images={[`1.png`, '2.png', '3.png', '4.png']} />
          </div>
        </AccordionItem>
      </div>
    </div>
  }
}

const Howto = withTranslation()(HowtoInner)