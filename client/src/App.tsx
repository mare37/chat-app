import { useState } from "react";
import "./App.css";
import Chat from "./chat";

function App() {
  const [room, setRoom] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [chatBar, setChatBar] = useState(false);

  const handleClick = () => {
    if (room < 1 || firstName.length === 0 || secondName.length === 0) {
      console.log("One or more of the fields is empty");
    } else {
      setChatBar(true);
    }
  };

  return (
    <div className="App">
      <div>
        {!chatBar ? (
          <div>
            <input
              placeholder="enter room number"
              onChange={(e) => {
                setRoom(parseInt(e.target.value));
              }}
            />
            <input
              type="text"
              placeholder="first name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="second name"
              onChange={(e) => {
                setSecondName(e.target.value);
              }}
            />
            <button onClick={handleClick}>Enter</button>
          </div>
        ) : (
          <Chat room={room} firstName={firstName} secondName={secondName} />
        )}
      </div>
    </div>
  );
}

export default App;
