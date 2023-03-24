import Mail from "./Mail";
import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <>
        <div className="flex justify-end pr-10 bg-pink-900 text-white font-bold ">
            
                
                 <Link to="/sentmail">  <h3 className="p-2 pl-3">Sent Box</h3> </Link> 
                
               
                   <Link to="/inbox"><h3 className="p-2 pl-3">Inbox</h3></Link> 
                
                    <h3 className="p-2 pl-3">logOut</h3>
                
        </div>
        <Mail/>
        </>
        
    )
}
export default Welcome;