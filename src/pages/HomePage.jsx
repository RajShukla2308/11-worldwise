
import { Link } from "react-router-dom";
import PageNav from "../components/pageNav";

export default function HomePage(){
  return (
    <div>
      <PageNav />
        WorldWise Home

        <Link to="/pricing">Pricing</Link>
    </div>
  )
}