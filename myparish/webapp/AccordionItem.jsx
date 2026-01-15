const AccordionItem = React.memo((props) => {
  const { t } = useTranslation()
  const { id, parent, show = false, children } = props

  return <div class="accordion-item">
    <h2 class="accordion-header">
      <button class={`accordion-button ${!show ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${id}`} aria-expanded="true" aria-controlls={`collapse${id}`}>{t(`label_${id}`)}</button>
    </h2>
    <div id={`collapse${id}`} class={`accordion-collapse collapse ${!!show ? 'show' : ''}`} data-bs-parent={`#${parent}`}>
      <div class="accordion-body">
        <div class="row">
          {children}
        </div>
      </div>
    </div>
  </div>
})
