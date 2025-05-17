'use client'
import { useEffect } from 'react'
import maplibregl from 'maplibre-gl'

export default function MapView() {
  useEffect(() => {
    const map = new maplibregl.Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [0, 0],
      zoom: 2,
    })
    return () => map.remove()
  }, [])

  return <div id="map" className="w-full h-96 border" />
}
