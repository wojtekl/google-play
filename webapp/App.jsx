const withTranslation = ReactI18next.withTranslation;

class App extends React.Component {
  render() {
    return <div><Carousel>
      <Carousel.Item>
        <Image src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/webapp/carousel1.jpg" fluid />
        <Carousel.Caption>
          <h1>Aplikacje {this.props.t('pow')}</h1>
          <p>mobilne i internetowe </p>
          <Button href="#/offer" variant="primary" size="lg">Przejdź</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/webapp/carousel2.jpg" fluid />
        <Carousel.Caption>
          <h1>Produkty</h1>
          <p>Zobacz zrealizowane projekty.</p>
          <Button href="#/products" variant="primary" size="lg">Przejdź</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/webapp/carousel3.jpg" fluid />
        <Carousel.Caption>
          <h1>Kontakt</h1>
          <p>Dowiedz się jak złożyć zamówienie.</p>
          <Button href="#/contact" variant="primary" size="lg">Przejdź</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  }
}

App.prototype = withTranslation()(App)