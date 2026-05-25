import { createContext, useEffect, useState } from "react";


const CitiesContext = createContext();

// eslint-disable-next-line react/prop-types
function CitiesProvider({children}){

    const [cities, setCities] = useState([]);
  const [isLoading,setIsLoading] = useState(false);


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


  return <CitiesContext.Provider value={{cities: cities, isLoading: isLoading}}>
        {children}
  </CitiesContext.Provider>


}

export { CitiesContext, CitiesProvider}