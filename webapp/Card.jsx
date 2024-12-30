const withTranslation = ReactI18next.withTranslation;

class CardInner extends React.Component {
  render() {
    const { t, image, description, urlButtonOnline, urlButtonGet, small } = this.props

    return <div class="col">
      <div class="card shadow-sm">
        <img src={image} style={{padding: '3rem'}} />
        <div class="card-body">
          <p class="card-text">{t(description)}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
            <a href={urlButtonOnline} class="btn btn-sm btn-outline-secondary" role="button" {...urlButtonOnline && 'disabled aria-disabled="true"'}>{t('button_online')}</a>
            <a href={urlButtonGet} class="btn btn-sm btn-outline-secondary" role="button">{t('button_get')}</a>
            </div>
            <small class="text-body-secondary">{t(small)}</small>
          </div>
        </div>
      </div>
    </div>
  }
}

const Card = withTranslation()(CardInner)