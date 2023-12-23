import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
let backend_url = "http://localhost:3000";

function Chat({ socket, chatId }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  window.onload = async () => {
    console.log(chatId)
    const response = await axios.post(`${backend_url}/chat/${chatId}`);
    const { status, data } = response;
    console.log(chatId)
    if (status === 200) {
      setMessageList(data.messages);
    }
    else {
      console.log("There has been error in loading the old chat");
    }
  }

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        author: localStorage.getItem("userId"),
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      const response = await axios.put(`${backend_url}/chat/${chatId}`, {
        ...messageData,
      });

      const { status, data } = response;
      if (status === 200) {
        await socket.emit("send_message", messageData);
        setMessageList(data.messages);
        setCurrentMessage("");
      }
      else {
        console.log("An error has occurred while sending the message")
      }
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={localStorage.getItem("userId") === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
