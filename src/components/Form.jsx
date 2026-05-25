/* eslint-disable react-refresh/only-export-components */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from './Spinner'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CityContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isLoading, setIsLoading] = useState(false);
  const [emoji,setEmoji] = useState('');
  const {createCity, isLoading: isCitiesSaving } = useCities();
  const navigate = useNavigate();


  useEffect(function(){
    async function getCity(){
      if(!lat && !lng) return;
      try{
        setIsLoading(true)
        const res = await fetch(`https://api-bdc.io/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
        const data = await res.json();
        setCityName(data.city || data.locality);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
        
      }catch(err){
        alert('something went wrong fetching city',err.message)
      }finally{
        setIsLoading(false)
      }
    }
    getCity()
  },[lat,lng])


  async function handleSubmit(e) {
    e.preventDefault();
    if(!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji, 
      date, 
      notes, 
      position: {lng,lat},
    }
   await createCity(newCity);
   navigate("/app");
  }


  if(isLoading) <Spinner />


  return (
    <form className={`${styles.form} ${isCitiesSaving ? styles.loading : ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker selected={date} 
         onChange={(date) => setDate(date)}
         dateFormat="dd/MM/yyyy"
         />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
