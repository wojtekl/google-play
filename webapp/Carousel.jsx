const withTranslation = ReactI18next.withTranslation


class CarouselInner extends React.Component {
  render() {
    const { id, gallery, images, t } = this.props

    return <div id={`carousel${id}`} class="carousel slide">
      <div class="carousel-inner">
        {images.map((element, index) => {
          const caption = `${t('carousel_image')} ${index + 1}`
          return <div class={`carousel-item ${0 === index ? 'active' : ''}`}>
            <figure class="figure">
              <img src={`${gallery}${id}_${element}`} class="d-block img-fluid" alt={caption} />
              <figcaption class="figcaption">{caption}</figcaption>
            </figure>
          </div>
        }
        )}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target={`#carousel${id}`} data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">{t('carousel_previous')}</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target={`#carousel${id}`} data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">{t('carousel_next')}</span>
      </button>
    </div>
  }
}

const Carousel = withTranslation()(CarouselInner)