/* eslint-disable react/prop-types */
import styles from './CountryList.module.css';
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';
import { useCities } from '../contexts/CityContext';


// eslint-disable-next-line react/prop-types
export default function CountryList(){
    const message = 'No Countries Added';
    const {cities, isLoading} = useCities();

    let countries = cities.reduce((arr,city)=>{
            if(!arr.map(el=>el.country).includes(city.country)){
                return [...arr, {country: city.country, emoji: city.emoji}]
            }else return arr
        }
        ,[]);
    

    if(isLoading) return <Spinner />

    if(!countries.length) return <Message message={message}/>
    return (
        <ul className={styles.countryList}>
           {countries.map(country=><CountryItem country={country} key={country.country} />)}
        </ul>
    )

}