import L from 'leaflet';
import mapMarker from '../images/map-marker.svg';

export default L.icon({
  iconUrl: mapMarker,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})