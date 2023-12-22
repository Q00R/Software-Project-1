import axios from "axios";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
let backend_url = "http://localhost:3000";

const socket = io.connect("http://localhost:5173/");

function ChatApp({ ticketId, agentId }) {
  const [showChat, setShowChat] = useState(false);
  const [room, setRoom] = useState(0);
  const username = localStorage.getItem("username");

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
    const { status, newChat } = response;
    if (status == 200) {
      setRoom(newChat.id);
      socket.emit("join_room", room);
      setShowChat(true);
    } else {
      console.log("ChatApp, join_room");
    }
    
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default ChatApp;
