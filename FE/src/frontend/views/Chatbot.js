import React, { useState,useEffect } from "react";
import Pusher from 'pusher-js';

export default function Chatbot() {
  const [message, setmessage] = useState([]);
  useEffect(() => {
    Pusher.logToConsole = true;

    var pusher = new Pusher('91728f3268936fea7c28', {
      cluster: 'ap1'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      alert(data.message.name);
    });
  }, []);
  return <div></div>;
}
