import {useSelector, useDispatch } from "react-redux"
import {RootState}  from "../../store"
import {useEffect,useState } from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"


function Home() {
  const navigate = useNavigate()

 
  const username = useSelector((state: RootState) => state.object.username)
  const [userName, setUserName] = useState(username);
  
  
  

  useEffect(()=>{

    //setUserName(username);

    
    

    axios.get("http://localhost:5000/api/logInStatus").then((response)=>{
          console.log(response.data.login);
          console.log(response.data);
          
          if (response.data.login) {  
            console.log("you are in");

          navigate(`/user/${userName}`)
          }else{
            navigate(`/login`);
          }
    }).catch((err)=>{
        console.log(err);
        
    })

},[])






  return <div>Home</div>;
}

export default Home;
