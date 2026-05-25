/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CityContext';
import { useGeolocation } from '../hooks/useGeoLocation';
import Button from '../components/Button';
import { useUrlPosition } from '../hooks/useUrlPosition';




export default function Map(){

  // // eslint-disable-next-line no-unused-vars
  // const [searchParams, setSearchParams] = useSearchParams();
  //  // eslint-disable-next-line no-unused-vars
  // const mapLat = searchParams.get('lat') || 40; const mapLng = searchParams.get('lng') || 0;

  const [mapLat, mapLng] = useUrlPosition();
 

  // eslint-disable-next-line no-unused-vars
  const [mapPosition, setMapPosition] = useState([40,0])

  const {cities} = useCities();

  const { isLoading: isLoadingPosition, 
    // eslint-disable-next-line no-unused-vars
    position: geoLocationPosition
    , getPosition } = useGeolocation();


  useEffect(function(){
    if(mapLat && mapLng) setMapPosition([mapLat,mapLng])
  },[mapLat,mapLng])


  useEffect(function (){
    if(geoLocationPosition) setMapPosition([geoLocationPosition.lat,geoLocationPosition.lng])
  },[geoLocationPosition])

  


  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && <Button type='position' onClick={getPosition}>
        {isLoadingPosition ? 'Loading...' : 'Use Your Position'}
      </Button>}
    <MapContainer
    center={mapPosition} 
      // center={[mapLat,mapLng]}
     className={styles.map} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cities.map(city=>{
        return <>
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
        <Popup>
          <span>{city.emoji} </span>
           <span>{city.cityName} </span>
        </Popup>
      </Marker></>
      }
       
      )
      }
      <ChangeCenter position={mapPosition} />
      <DetectClick />
  </MapContainer>
      
    </div>
  )
}

function ChangeCenter({position}){
  const map = useMap();
  map.setView(position)
  return null;
}

function DetectClick(){
  const navigate = useNavigate();

  useMapEvents({
    // eslint-disable-next-line no-unused-vars
    click: (e)=> navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
}