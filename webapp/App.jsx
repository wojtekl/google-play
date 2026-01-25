//import React from 'react'
//import { withTranslation } from 'react-i18next'


class AppInner extends React.Component {

  render() {
    const { t } = this.props

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
        <section class="py-5 text-center container">
          <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto">
              <h1 class="fw-light">{t('title_products')}</h1>
              <p class="lead text-body-secondary">{t('description_products')}</p>
              <p>
                <a href="/howto/" class="btn btn-primary my-2" role="button" rel="external">{t('button_howto')}</a>
                <a href="" class="btn btn-secondary my-2 d-none" role="button" rel="external">{t('')}</a>
              </p>
            </div>
          </div>
        </section>
        <Divider />
        <Hero
          image="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/pricey/Pricey/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.webp"
          description="description_pricey"
          urlButtonOnline="https://cennik.wlap.pl/"
          small="name_pricey"
        />
        <Divider />
        <Hero
          image="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/myparish/MojaParafia/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.webp"
          description="description_myparish"
          urlButtonOnline="https://parafia.wlap.pl/"
          small="name_myparish"
        />
        <Divider />
      </main>

      <footer class="text-body-secondary py-5">
        <div class="container">
          <p class="float-end mb-1">
            <a href="#">{t('button_backtotop')}</a>
          </p>
          <p class="mb-1">{t('description_copyright')}</p>
          <p class="mb-0">{t('description_guide')}</p>
        </div>
      </footer>
    </>
  }
}

export const App = withTranslation()(AppInner)
