import { createContext, useContext, useEffect, useState } from "react";


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

function useCities(){
  const context = useContext(CitiesContext);
  if(context === undefined) throw new Error('Cities context was used outside the cities provider')
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities }