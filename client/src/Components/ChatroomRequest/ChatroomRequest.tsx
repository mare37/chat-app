import "./ChatroomRequest.css"


interface props{
  username:string
}



function ChatroomRequest({username}: props) {
  return (
    <div>
      <p  className="name">{username}</p> <button>Accept</button> <button>Reject</button>
    </div>
  );
}



export default ChatroomRequest;