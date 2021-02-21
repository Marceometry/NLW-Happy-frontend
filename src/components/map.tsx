import React from 'react';
import { MapContainer as LeafletMap, MapContainerProps as LeafletMapProps, TileLayer } from 'react-leaflet'

interface MapContainerProps extends LeafletMapProps {
  interactive?: boolean
  children: React.ReactNode
}

export default function Map({ children, interactive = true, ...props }: MapContainerProps) {
  return (
    <LeafletMap 
      center={[-30.2606082, -50.516207]} 
      zoom={15} 
      style={{ width: '100%', height: '100%' }}
      dragging={interactive}
      touchZoom={interactive}
      zoomControl={interactive}
      scrollWheelZoom={interactive}
      doubleClickZoom={interactive}
      {...props}
    >
      <TileLayer url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`} />

      {children}
      
    </LeafletMap>
  )
}