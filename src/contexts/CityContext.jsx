import { createContext, useContext, useEffect, useState } from "react";


const CitiesContext = createContext();

// eslint-disable-next-line react/prop-types
function CitiesProvider({children}){
  const [cities, setCities] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});


  useEffect(function(){

    async function fetchCities(){
      try {
        setIsLoading(true)
        const res = await fetch('http://localhost:8000/cities');
        const data = await res.json();
        setCities(data);
      }
     catch{
      alert('something went wrong!')
      }
      finally{
        setIsLoading(false);
      }
  }
    fetchCities()
  },[])


  async function getCity(id){
      try{
          setIsLoading(true)
          const res = await fetch(`http://localhost:8000/cities/${id}`);
          const data = await res.json();
          setCurrentCity(data);
      }catch{
        alert('something went wrong fetching city');
      }finally{
        setIsLoading(false);
      }
  }


  async function createCity(newCity){
      try{
          setIsLoading(true)
          const res = await fetch(`http://localhost:8000/cities`,{
            method: 'POST',
            body: JSON.stringify(newCity),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await res.json();
         setCities(cities=>[...cities,data])
      }catch{
        alert('something went wrong fetching city');
      }finally{
        setIsLoading(false);
      }
  }


  return <CitiesContext.Provider value={{cities,
  isLoading,currentCity,getCity, createCity}}>
        {children}
  </CitiesContext.Provider>
}

function useCities(){
  const context = useContext(CitiesContext);
  if(context === undefined) throw new Error('Cities context was used outside the cities provider')
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities}