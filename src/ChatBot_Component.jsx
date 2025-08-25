import React, { useState } from "react";
import "./ChatBot.css";
function ChatBot_Component() {
  const [input, setInput] = useState("");
  const [chatArray, setChatArray] = useState([]);

  const askAI = async () => {
    if (!input) return;

    setChatArray((prev) => [...prev, { type: "input", content: input }]);

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer `,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      const response = data.choices[0].message.content;

      setChatArray((prev) => [...prev, { type: "output", content: response }]);
    } catch (error) {
      console.error(error);
      setChatArray((prev) => [
        ...prev,
        { type: "output", content: "Something went wrong. Check the console." },
      ]);
    }

    setInput("");
    console.log(chatArray);
  };

  return (
    <div className="main">
      <h1>ChatGPT</h1>

      <div className="chat-history">
        {chatArray.map((msg, idx) => (
          <div className={msg?.type === "input" ? `userInput` : ``} key={idx}>
            <strong>{msg.type === "input"}</strong>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="chatandbutt">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="chatArea"
        />
        <button className="send" onClick={askAI}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBot_Component;
