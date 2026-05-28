import { BrowserRouter, Routes , Route} from "react-router-dom";
// import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";


import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from './components/City';
import Form from './components/Form';
import SpinnerFullPage from './components/SpinnerFullPage'

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import HomePage from "./pages/HomePage";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

const Product = lazy(()=>import("./pages/Product"));
const Pricing = lazy(()=>import("./pages/Pricing"));
const HomePage = lazy(()=>import("./pages/HomePage"));
const PageNotFound = lazy(()=>import("./pages/PageNotFound"));
const AppLayout = lazy(()=>import("./pages/AppLayout"));
const Login = lazy(()=>import("./pages/Login"));



import { CitiesProvider } from "./contexts/CityContext";
import {AuthProvider} from './contexts/AuthContext';
import ProtectedRoute from "./pages/ProtectedRoute";

export default function App(){
  

  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route path="app" element={ 
              <ProtectedRoute>
                <AppLayout /> 
              </ProtectedRoute>} >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />}/>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}