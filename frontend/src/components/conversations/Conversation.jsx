import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";
const backend_url = "http://localhost:3000";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const eltanyId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios(`${backend_url}/api/v1/${eltanyId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src="https://media.tenor.com/z3HRQ3FONBAAAAAM/what-the-acutal-fu-are-u-in-my-house.gif"
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
