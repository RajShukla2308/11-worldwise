/* eslint-disable react/prop-types */
import styles from './CountryList.module.css';
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';


// eslint-disable-next-line react/prop-types
export default function CountryList({cities, isLoading}){
    console.log(cities,isLoading);
    const message = 'No Countries Added';

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