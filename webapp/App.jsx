class App extends React.Component {
  render() {
    return (<Carousel>
      <Carousel.Item>
        <img src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/webapp/carousel1.jpg"
          class="d-block w-100" alt="..." />
        <Carousel.Caption>
          <h1>Aplikacje</h1>
          <p>mobilne i internetowe</p>
          <p>
            <a class="btn btn-lg btn-primary" href="#oferta">Przejdź</a>
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/webapp/carousel2.jpg"
          class="d-block w-100" alt="..." />
        <Carousel.Caption>
          <h1>Produkty</h1>
          <p>Zobacz zrealizowane projekty.</p>
          <p>
            <a class="btn btn-lg btn-primary" href="#produkty">Przejdź</a>
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/webapp/carousel3.jpg"
          class="d-block w-100" alt="..." />
        <Carousel.Caption>
          <h1>Kontakt</h1>
          <p>Dowiedz się jak złożyć zamówienie.</p>
          <p>
            <a class="btn btn-lg btn-primary" href="#kontakt">Przejdź</a>
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>)
  }
}