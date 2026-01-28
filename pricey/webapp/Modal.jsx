const Modal = (props) => {
  const { show, handleClose, item, storeName, day } = props
  const { t } = useTranslation()

  const handleSubmit = (event) => {
    event.preventDefault()
    
    const form = document.querySelector('#form_item')
    axios.post('item', form, { headers: { 'Content-Type': 'multipart/form-data' } }).then(() => {
      form.reset()
    })
  }

  return (
<div class="modal" id="confirmModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"> {!item ? t('button_new_product') : `${t('label_item')}: ${item}`} </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label={t('label_close')}></button>
      </div>
      <form id="form_item" enctype="multipart/form-data" onSubmit={handleSubmit}>
        <div class="modal-body">
          <div class="form-group">
            <label for="exampleInputName1">{t('label_name')}</label>
            <input type="text" class="form-control" id="exampleInputName1" aria-describedby="nameHelp" name="name" value={item} required minlength="5" maxlength="100" autocomplete="off" />
            <small id="nameHelp" class="form-text text-muted">{t('help_name')}</small>
          </div>
          <div class="form-group">
            <label for="exampleInputStore1">{t('label_store')}</label>
            <input type="text" class="form-control" id="exampleInputStore1" aria-describedby="storeHelp" name="store" value={storeName} required maxlength="50" />
            <small id="storeHelp" class="form-text text-muted">{t('help_store')}</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPrice1">{t('label_price')}</label>
            <input type="number" min="0.05" max="500" step="0.01" class="form-control" id="exampleInputPrice1" aria-describedby="priceHelp" name="price" required />
            <small id="priceHelp" class="form-text text-muted">{t('help_decimal')}</small>
          </div>
          <div class="form-group">
            <input type="hidden" class="form-control" id="exampleHiddenId1" aria-label="identyfikator" name="identyfikator" value="web" />
          </div>
          <div class="form-group">
            <input type="hidden" class="form-control" id="exampleHiddenCountry1" aria-label="country" name="country" value={store.getState().lang} />
          </div>
          <div class="form-group">
            <input type="hidden" class="form-control" id="exampleHiddenDay1" aria-label="day" name="day" value={day} />
          </div>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="exampleInputCoupon1" aria-describedby="couponHelp" name="coupon" />
            <label for="exampleInputCoupon1" class="form-check-label">{t('label_coupon')}</label>
            <small id="couponHelp" class="form-text text-muted">{t('help_membership')}</small>
          </div>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="exampleInputBulk1" aria-describedby="bulkHelp" name="bulk" />
            <label for="exampleInputBulk1" class="form-check-label">{t('label_bulk')}</label>
            <small id="couponHelp" class="form-text text-muted">{t('help_bulk')}</small>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"> {t('button_cancel')} </button>
          <button type="submit" class="btn btn-primary" data-bs-dismiss="modal"> {t('button_save')} </button>
        </div>
      </form>
    </div>
  </div>
</div>
)
}
