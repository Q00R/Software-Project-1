import "./Chat.css";
import axios from "axios";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
let backend_url = "http://localhost:3000";

const socket = io.connect("http://localhost:3000");

function ChatApp({ ticketId, agentId }) {
  const [showChat, setShowChat] = useState(false);
  const [room, setRoom] = useState("");

  const joinRoom = async () => {
    const request = {
      ticketId: ticketId,
      userId: localStorage.getItem("userId"),
      agentId: agentId
    }
    const response = await axios.post(
      `${backend_url}/chat`,
      {
        ...request,
      }
    );
    const { status, data } = response;
    if (status === 200) {
      setRoom(data._id);
      socket.emit("join_room", data._id);
      setShowChat(true);
    } else {
      console.log("There was an error creating a chat");
    }

  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} chatId={room} />
      )}
    </div>
  );
}

export default ChatApp;
