import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UserAccount() {
  const { username } = useParams();

  const [createGroup, setCreateGroup] = useState(false);

  return (
    <div>
      <div>{`WELCOME ${username}`}</div>

      <button
        onClick={() => {
          setCreateGroup(true);
        }}
      >
        Create Chatroom
      </button>

      {createGroup === true ? (
        <form>
          <input />
          <button>Create</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}

export default UserAccount;
