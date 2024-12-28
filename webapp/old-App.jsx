const withTranslation = ReactI18next.withTranslation;

class AppInner extends React.Component {
  render() {
    const { t } = this.props

    return <div><Carousel>
      <Carousel.Item>
        <Image src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/webapp/carousel1.jpg" fluid />
        <Carousel.Caption>
          <h1>{t('title_offer')}</h1>
          <p>{t('subtitle_offer')}</p>
          <Button href="#/offer" variant="primary" size="lg">{t('button_see')}</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/webapp/carousel2.jpg" fluid />
        <Carousel.Caption>
          <h1>{t('title_products')}</h1>
          <p>{t('subtitle_products')}</p>
          <Button href="#/products" variant="primary" size="lg">{t('button_see')}</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/webapp/carousel3.jpg" fluid />
        <Carousel.Caption>
          <h1>{t('title_contact')}</h1>
          <p>{t('subtitle_contact')}</p>
          <Button href="#/contact" variant="primary" size="lg">{t('button_see')}</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  }
}

const App = withTranslation()(AppInner)