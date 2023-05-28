import React from 'react'
import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet'
import {useEffect} from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styles from '../assets/css/mapping.module.css'

export const Mapping = () => {


  //Define react query for api calls
  const dataQuery = useQuery({
    queryKey: ['diseases'],
    queryFn: async () => {
      const response = await axios.get('https://disease.sh/v3/covid-19/countries');
      const data = await response.data;
      return data;
    },
    refetchOnWindowFocus:false,
     enabled: false // disable this query from automatically running

    /**TODO/
    /**May refine api call based on map scroll*/

    // select:(total)=>total[`${selected}`],

  })

  //load entire data on component load 

  useEffect(() => {
      dataQuery.refetch()
  }, [])
  

  return (


    <div style={{width:'fit-content'}}>
    <MapContainer zoom={1} center={[0, 0]}  scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {dataQuery.data?  dataQuery.data.map((countryData:Country)=>{

            const {lat,long,flag}=countryData.countryInfo  //for marker
            const {country,active,recovered,deaths}=countryData //for popup
            return   <Marker position={[lat, long]}>
                        <Popup>
                            <div className={styles['popup']}>
                              <div className={styles['country-heading']}>{country}<div className={styles['image-container']}><img src={flag} alt={"flag"}></img></div></div>
                              <div className={styles['country-data']}>
                                <div><span ><b>Active&nbsp;:&nbsp;</b></span>{active}</div>
                                <div><span ><b>Recovered&nbsp;:&nbsp;</b></span>{recovered}</div>
                                <div><span ><b>Deaths&nbsp;:&nbsp;</b></span>{deaths}</div>
                              </div>
                            </div>
                        </Popup>
                      </Marker>
    }): null}
    {/* <Marker position={[51.505, -0.09]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker> */}
  </MapContainer>
  <div>
  
  </div>
  </div>
 
    
  )
}
