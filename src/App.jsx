import { BrowserRouter, Routes , Route} from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from './components/City';
import Form from './components/Form'

export default function App(){
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



  return (
    <BrowserRouter>
      <Routes>
         <Route index element={<HomePage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />} >
          <Route index element={<Navigate replace to="cities" />} />
          <Route path="cities" element={<CityList cities={cities} 
          isLoading={isLoading}/>} />
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
          <Route path="form" element={<Form />}/>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}