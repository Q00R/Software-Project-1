import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";
const backend_url = "http://localhost:3000";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    const eltanyId = conversation.members.find((m) => m !== currentUser._id);

    const getAgentUsername = async () => {
      if (eltanyId) {
        try {
          const res = await axios(`${backend_url}/conversations/agentUsername/${eltanyId}`, { withCredentials: true });
          setUser(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getAgentUsername();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src="https://media.tenor.com/z3HRQ3FONBAAAAAM/what-the-acutal-fu-are-u-in-my-house.gif"
        alt=""
      />
      <span className="conversationName">{user}</span>
    </div>
  );
}
