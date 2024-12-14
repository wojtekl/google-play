const DateFormatter = (props) => {
  const { timestamp } = props
  const locale = new URLSearchParams(new URL(window.location).search).get('lang') ?? navigator.language.substring(3).toLocaleLowerCase()
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const format = { month: "short", day: "numeric", timezone: timezone }
  return new Date(timestamp).toLocaleString(locale, format)
}