import {  NavLink } from "react-router-dom"

export default function PageNav(){
  return (
    <ul>
        <li>
            <NavLink to="/">Home Page</NavLink>
        </li>
        <li>
            <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
            <NavLink to="/product">Product</NavLink>
        </li>
    </ul>
  )
}