import { Link} from "react-router-dom";

export default function HomePage(){
    return (
        <>
        <h1>My Home</h1>
        <p>Go to  <Link to="/products">list of products</Link>.
        </p>
        </>
    
    )
}