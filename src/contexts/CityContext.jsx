import { createContext, useContext, useEffect, useReducer, useCallback } from "react";


const CitiesContext = createContext();


const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ''
}

function reducer(state,action){
  switch(action.type){
    case 'loading':
      return {...state, isLoading: false}
    
    case 'cities/loaded':
      return {...state, cities: action.payload, isLoading: false};

    
    case 'city/loaded':
      return {...state, currentCity: action.payload, isLoading: false}

    case 'cities/created':
      return {...state, cities:[...state.cities,action.payload], isLoading: false }

    case 'cities/deleted':
      return {
        ...state, 
        cities: state.cities.filter(city=> city.id !== action.payload),
        isLoading : false
      }

    case 'rejected': 
      return {...state, isLoading: false, error: action.payload }
    default: 
      throw new Error('No action found')
  }
}

// eslint-disable-next-line react/prop-types
function CitiesProvider({children}){
  // const [cities, setCities] = useState([]);
  // const [isLoading,setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  // using useReducer Hook
  // const [state, dispatch] = useReducer(reducer, initialState)

  const [{cities, isLoading, currentCity}, dispatch] = useReducer(reducer, initialState);



  useEffect(function(){

    async function fetchCities(){
      dispatch({type: 'loading'})
      try {
        // setIsLoading(true)
        const res = await fetch('http://localhost:8000/cities');
        const data = await res.json();
        // setCities(data);
        dispatch({type: 'cities/loaded', payload:data})
      }
     catch{
      dispatch({type: 'rejected', payload: 'something went wrong!'})
      }
      finally{
        // setIsLoading(false);
      }
  }
    fetchCities()
  },[])


  const getCity = useCallback(async function getCity(id){
      if(Number.id === currentCity.id) return;
      dispatch({type:'loading'})
      try{
          // setIsLoading(true)
          const res = await fetch(`http://localhost:8000/cities/${id}`);
          const data = await res.json();
          // setCurrentCity(data);
          dispatch({type: 'city/loaded',payload: data})
      }catch{
        // alert('something went wrong fetching city');
        dispatch({type:'rejected', payload: 'something went wrong fetching city'})
      }finally{
        // setIsLoading(false);
      }
  },[currentCity.id])


  async function createCity(newCity){
    dispatch({type:'loading'})
      try{
          
          const res = await fetch(`http://localhost:8000/cities`,{
            method: 'POST',
            body: JSON.stringify(newCity),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await res.json();
          dispatch({type: 'cities/created', payload:data })
        //  setCities(cities=>[...cities,data])
      }catch{
        alert('something went wrong fetching city');
        dispatch({type:'rejected', payload: 'something went wrong creating city'})
      }finally{
        // setIsLoading(false);
      }
  }


  async function deleteCity(id){
      dispatch({type: 'loading'})
      try{
          // setIsLoading(true)
          await fetch(`http://localhost:8000/cities/${id}`,{
            method: 'DELETE'
          });
        //  setCities(cities=>cities.filter(city=> city.id !== id));
        dispatch({type:'cities/deleted', payload: id})
      }catch{
        alert('something went wrong deleting city');
        dispatch({type:'rejected', payload: 'something went wrong deleting city'})
      }finally{
        // setIsLoading(false);
      }
  }


  return <CitiesContext.Provider value={{cities,
  isLoading,currentCity,getCity, createCity, deleteCity}}>
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