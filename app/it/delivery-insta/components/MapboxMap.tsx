"use client"

import React, { useRef, useEffect } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

interface MapboxMapProps {
  position: [number, number]
  city: string
  country: string
  ip: string
  zoom?: number
}

export default function MapboxMap({ position, city, country, ip, zoom = 13 }: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const [lat, lng] = position

  useEffect(() => {
    if (map.current || !mapContainer.current) return // Initialize map only once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json', // Free Dark Matter style
      center: [lng, lat],
      zoom: zoom
    })

    // Create custom marker element
    const markerElement = document.createElement('div')
    markerElement.className = 'relative'
    markerElement.innerHTML = `
      <div class="w-8 h-8 bg-blue-500 rounded-full border-3 border-white shadow-xl flex items-center justify-center animate-pulse">
        <div class="w-3 h-3 bg-white rounded-full"></div>
      </div>
    `

    // Add marker to map
    new maplibregl.Marker(markerElement)
      .setLngLat([lng, lat])
      .addTo(map.current)

    // Create popup
    const popup = new maplibregl.Popup({  
      offset: 25,
      closeButton: false,
      closeOnClick: false
    })
      .setLngLat([lng, lat])
      .setHTML(`
         <div class="p-3 min-w-[200px]">
           <h4 class="text-white font-semibold text-sm">Localizzazione rilevata</h4>
           <p class="text-gray-300 text-xs">📍 ${city}, ${country}</p>
           <p class="text-gray-400 text-xs">IP: ${ip}</p>
           <p class="text-gray-400 text-xs">Precisione: ±50m</p>
         </div>
       `)
      .addTo(map.current)

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [lng, lat, zoom, city, country, ip])

  return (
    <div 
      ref={mapContainer} 
      style={{ width: '100%', height: '100%' }}
      className="maplibre-map"
    />
  )
}