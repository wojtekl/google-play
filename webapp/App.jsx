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
                <h4>{t('subtitle_contact')}</h4>
                <p class="text-body-secondary">{t('description_contact')}</p>
              </div>
              <div class="col-sm-4 offset-md-1 py-4">
                <h4>{t('title_contact')}</h4>
                <ul class="list-unstyled">
                  <li>
                    <a href="mailto:wleap.zhulp@slmails.com" class="text-white">Email us</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="navbar navbar-dark bg-dark shadow-sm">
          <div class="container">
            <a class="navbar-brand d-flex align-items-center">
              <strong>wlap.pl</strong>
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
              <h1 class="fw-light">Nasze apki</h1>
              <p class="lead text-body-secondary">Zajmujemy się tworzeniem aplikacji mobilnych na system Android oraz
                aplikacji internetowych które można używać na dowolnej platformie z dostępem do internetu</p>
              <p>
                <a href="https://play.google.com/store/apps/dev?id=5731012165048810814" class="btn btn-primary my-2">Google
                  Play</a>
                <a href="#" class="btn btn-secondary my-2">Brak</a>
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
                        <a href="https://pricey.wlap.pl" class="btn btn-sm btn-outline-secondary">{t('button_see')}</a>
                        <a href="#" class="btn btn-sm btn-outline-secondary">Apka</a>
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
                        <a href="https://parafia.wlap.pl" class="btn btn-sm btn-outline-secondary">{t('button_see')}</a>
                        <a href="#" class="btn btn-sm btn-outline-secondary">Apka</a>
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
                        <a href="#" class="btn btn-sm btn-outline-secondary">{t('button_see')}</a>
                        <a href="https://play.google.com/store/apps/details?id=github.wleap.busstop" class="btn btn-sm btn-outline-secondary">Apka</a>
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
            <a href="#">Back to top</a>
          </p>
          <p class="mb-1">wlap.pl</p>
          <p class="mb-0">2024</p>
        </div>
      </footer>
    </>
  }
}

const App = withTranslation()(AppInner)