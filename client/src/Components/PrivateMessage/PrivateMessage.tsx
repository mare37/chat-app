
function PrivateMessage(){



    return(
        <div className="Chat">
        <div>{/*singleChatroom.chatroom_name*/}</div>
        <div className="chat-area">{/*allMessages*/}</div>
        <div className="input-section">
          <input
            id="message-input"
            type="text"
            placeholder="type here"
            onChange={(e) => {
             // setmessageToBeSent(e.target.value);
            }}
          />
          <button>Send</button>
        </div>
      </div>
    )
}



export default PrivateMessage