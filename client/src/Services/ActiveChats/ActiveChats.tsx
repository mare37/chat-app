import axios from "axios";


const getChats = async (myUserId:number)=>{

        const response =  await axios.get(`http://localhost:5000/api/activechats/${myUserId}}`)

        console.log(response.data);

        return response.data;
        


}



export {getChats};






