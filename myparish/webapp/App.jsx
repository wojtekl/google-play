const App = React.memo(() => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(clients.clients.find(i => i.name === store.getState().value))

  useEffect(() => {
    const map = L.map('map').setView(selected ? [selected.latitude, selected.longitude] : [52.114503, 19.423561], 9)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" rel="external">OpenStreetMap</a>'
    }).addTo(map)

    const markerDefault = L.divIcon({ html: '<i class="bi bi-geo-alt-fill" style="font-size: 20px" aria-label="Marker default"></i>', className: "markerDefault", size: [20, 23], iconAnchor: [10, 11] })
    const markerLive = L.divIcon({ html: '<i class="bi bi-geo-alt-fill" style="font-size: 20px; color: red" aria-label="Marker live"></i>', className: "markerLive", size: [20, 23], iconAnchor: [10, 11] })
    const markerActive = L.divIcon({ html: '<i class="bi bi-geo-alt-fill" style="font-size: 20px; color: blue" aria-label="Marker active"></i>', className: "markerActive", size: [20, 23], iconAnchor: [10, 11] })

    const list = React.useMemo(useGetClients())
    const inactive = L.layerGroup(list.filter(i => !i.incoming).map(i => L
      .marker([i.latitude, i.longitude], { icon: markerDefault })
      .bindPopup(`<p>${i.name}</p><p>${i.incoming}</p><a href="#/selected/${i.name}"> ${t('see_link')} </a>`))).addTo(map)
    const active = L.layerGroup(list.filter(i => !!i.incoming).map(i => L
      .marker([i.latitude, i.longitude], { icon: i.live ? markerLive : markerActive })
      .bindPopup(`<p>${i.name}</p><p>${i.incoming}</p><a href="#/selected/${i.name}"> ${t('see_link')} </a>`))).addTo(map)

    L.control.layers(null, { [t('overlay_inactive')]: inactive, [t('overlay_active')]: active }).addTo(map)

    document.title = t('title_app')
    document.getElementsByTagName('meta').description.content = t('meta_description')
    document.getElementsByTagName('meta').keywords.content = t('meta_keywords')
  }, [])

  const mapDiv = React.createElement('div', { id: "map", style: { width: "100%", height: "100%" } })

  return <>
    <Navi current="map" />
    <div class="container" style={{ height: "calc(100vh - 59px)" }}>{mapDiv}</div>
  </>
})
