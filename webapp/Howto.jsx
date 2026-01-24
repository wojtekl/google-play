import React from 'react'
import { withTranslation } from 'react-i18next'


class HowtoInner extends React.Component {

  render() {
    const { t } = this.props

    const gallery = 'https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/webapp/'

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
              <div class="col-md-10 col-sm-6">
                <strong>{t('accordion_intro_iphone')}</strong>
                <ul>
                  <li>{t('accordion_contd1_iphone')}</li>
                  <li>{t('accordion_contd2_iphone')}</li>
                  <li>{t('accordion_contd3_iphone')}</li>
                  <li>{t('accordion_contd4_iphone')}</li>
                </ul>
              </div>
              <div class="col-md-2 col-sm-6" data-bs-theme="dark">
                <Carousel id="iphone" gallery={gallery} images={['1.png', '2.png', '3.png', '4.png']} />
              </div>
            </AccordionItem>
            <AccordionItem id="android" parent="accordionExample">
              <div class="col-md-2 col-sm-6" data-bs-theme="dark">
                <Carousel id="android" gallery={gallery} images={['1.png', '2.png', '3.png', '4.png']} />
              </div>
              <div class="col-md-10 col-sm-6">
                <ul>
                  <strong>{t('accordion_intro_android')}</strong>
                  <li>{t('accordion_contd1_android')}</li>
                  <li>{t('accordion_contd2_android')}</li>
                  <li>{t('accordion_contd3_android')}</li>
                  <li>{t('accordion_contd4_android')}</li>
                </ul>
              </div>
            </AccordionItem>
            <AccordionItem id="windows" parent="accordionExample">
              <div class="col-md-6 col-sm-6">
                <ul>
                  <strong>{t('accordion_intro_windows')}</strong>
                  <li>{t('accordion_contd1_windows')}</li>
                  <li>{t('accordion_contd2_windows')}</li>
                  <li>{t('accordion_contd3_windows')}</li>
                  <li>{t('accordion_contd4_windows')}</li>
                </ul>
              </div>
              <div class="col-md-6 col-sm-6" data-bs-theme="dark">
                <Carousel id="windows" gallery={gallery} images={[`1.png`, '2.png', '3.png', '4.png']} />
              </div>
            </AccordionItem>
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
}

const Howto = withTranslation()(HowtoInner)
