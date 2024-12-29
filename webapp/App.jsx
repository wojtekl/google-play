const withTranslation = ReactI18next.withTranslation;

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
                <a href="https://play.google.com/store/apps/dev?id=5731012165048810814" class="btn btn-primary my-2" role="button">{t('button_googleplay')}</a>
                <a class="btn btn-secondary my-2" disabled role="button" aria-disabled="true">{t('button_action')}</a>
              </p>
            </div>
          </div>
        </section>

        <div class="album py-5 bg-body-tertiary">
          <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              <div class="col">
                <div class="card shadow-sm">
                  <img
                    src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/pricey/Pricey/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.webp" />
                  <div class="card-body">
                    <p class="card-text">{t('description_pricey')}</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <a href="https://pricey.wlap.pl" class="btn btn-sm btn-outline-secondary" role="button">{t('button_online')}</a>
                        <a href="https://rb.gy/sqezhd" class="btn btn-sm btn-outline-secondary" role="button">{t('button_get')}</a>
                      </div>
                      <small class="text-body-secondary">{t('name_pricey')}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm">
                  <img
                    src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/myparish/MyParish/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.webp" />
                  <div class="card-body">
                    <p class="card-text">{t('description_myparish')}</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <a href="https://parafia.wlap.pl" class="btn btn-sm btn-outline-secondary" role="button">{t('button_online')}</a>
                        <a href="https://play.google.com/store/apps/details?id=github.wleap.myparish" class="btn btn-sm btn-outline-secondary" role="button">{t('button_get')}</a>
                      </div>
                      <small class="text-body-secondary">{t('name_myparish')}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm">
                  <img
                    src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/busstop/BusStop/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.webp" />
                  <div class="card-body">
                    <p class="card-text">{t('description_busstop')}</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <a class="btn btn-sm btn-outline-secondary" disabled role="button" aria-disabled="true">{t('button_online')}</a>
                        <a href="https://play.google.com/store/apps/details?id=github.wleap.busstop" class="btn btn-sm btn-outline-secondary" role="button">{t('button_get')}</a>
                      </div>
                      <small class="text-body-secondary">{t('name_busstop')}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

const App = withTranslation()(AppInner)