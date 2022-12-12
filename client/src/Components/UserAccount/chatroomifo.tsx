import * as React from "react";

function ChatRoomInfo(props:any){
    
    return(
        <div>
            <div>{props.oneChatRoom}</div>
            <div>{`Number of Members: ${props.numberOfMembers}`}</div>
            <div>Admins</div>


        </div>
    )

}


export  default  ChatRoomInfo;