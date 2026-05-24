/* eslint-disable react/prop-types */
import styles from './CityList.module.css';
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';


// eslint-disable-next-line react/prop-types
export default function CityList({cities, isLoading}){
    console.log(cities,isLoading);
    const message = 'No Cities Added'

    if(isLoading) return <Spinner />

    if(!cities.length) return <Message message={message}/>
    return (
        <ul className={styles.cityList}>
           {cities.map(city=><CityItem city={city} key={city.id} />)}
        </ul>
    )

}