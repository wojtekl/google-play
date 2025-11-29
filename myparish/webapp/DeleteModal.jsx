const DeleteModal = (props) => {
  const { t } = useTranslation()
  const { onOK } = props
  
  return <div class="modal" id="deleteModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{t('label_delete_title')}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label={t('label_close')}></button>
        </div>
        <div class="modal-body">
          <p>{t('label_delete')}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{t('label_cancel')}</button>
          <button type="button" class="btn btn-primary" onClick={onOk}>{t('label_ok')}</button>
        </div>
      </div>
    </div>
  </div>
}
