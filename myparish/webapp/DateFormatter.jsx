const DateFormatter = React.memo((props) => {
  const { timestamp, format } = props
  const { t } = useTranslation()
  const locale = new URLSearchParams(new URL(window.location).search).get('lang') ?? navigator.language.substring(3).toLocaleLowerCase()
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const formatDefault = { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "numeric", timezone: timezone }
  const formatDate = { weekday: "short", month: "short", day: "numeric", timezone: timezone }
  const formatTime = { hour: "numeric", minute: "numeric", timezone: timezone }
  return !timestamp ? t('label_nodate') : new Date(timestamp).toLocaleString(locale, 'time' === format ? formatTime : 'date' === format ? formatDate : formatDefault)
})
