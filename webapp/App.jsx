class App extends React.Component {
  render() {
    return (<Carousel>
      <Carousel.Item>
        <Image src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/webapp/carousel1.jpg" />
        <Carousel.Caption>
          <h1>Aplikacje</h1>
          <p>mobilne i internetowe</p>
          <Button href="#oferta" variant="primary" size="lg">Przejdź</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/webapp/carousel2.jpg" />
        <Carousel.Caption>
          <h1>Produkty</h1>
          <p>Zobacz zrealizowane projekty.</p>
          <Button href="#produkty" variant="primary" size="lg">Przejdź</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="https://raw.githubusercontent.com/wojtekl/google-play/refs/heads/main/webapp/carousel3.jpg" />
        <Carousel.Caption>
          <h1>Kontakt</h1>
          <p>Dowiedz się jak złożyć zamówienie.</p>
          <Button href="#kontakt" variant="primary" size="lg">Przejdź</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>)
  }
}