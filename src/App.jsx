import './app.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.svg';
import gptImgLogo from './assets/chatgptLogo.svg'; // Upewnij się, że plik istnieje
import { useEffect, useRef, useState } from 'react';


const API_URL = 'https://api-inference.huggingface.co/models/gpt2'; // Using Hugging Face GPT-2 model
const API_KEY = ''; // Replace with your Hugging Face API key

// Send message to GPT-2 (Hugging Face API)
async function sendMsgToGPT2(message) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ inputs: message })
  });

  const data = await response.json();
  return data[0]?.generated_text || 'Error: No response generated';
}

function App() {
  const msgEnd = useRef(null);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hi, I am ChatGPT!', isBot: true },
  ]);

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return; // Unikaj wysyłania pustych wiadomości
    const userMessage = { text: input, isBot: false };
    setInput('');
    setMessages((prev) => [...prev, userMessage]);

    try {
      const botResponse = await sendMsgToGPT2(input); // Use Hugging Face GPT-2 API
      const botMessage = { text: botResponse, isBot: true };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { text: 'Error: Unable to fetch response.', isBot: true };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleQuery = async (text) => {
    const userMessage = { text, isBot: false };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const botResponse = await sendMsgToGPT2(text); // Use Hugging Face GPT-2 API
      const botMessage = { text: botResponse, isBot: true };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { text: 'Error: Unable to fetch response.', isBot: true };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="Logo" className="logo" />
            <span className="brand">ChatGPT</span>
          </div>
          <button className="midBtn" onClick={() => window.location.reload()}>
            <img src={addBtn} alt="new chat" className="addBtn" />
            New Chat
          </button>
          <div className="upperSideBottom">
            <button className="query" onClick={() => handleQuery('What is programming?')}>
              <img src={msgIcon} alt="Query" />
              What is programming?
            </button>
            <button className="query" onClick={() => handleQuery('How to use an API?')}>
              <img src={msgIcon} alt="Query" />
              How to use an API?
            </button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="Home" className="listitemsImg" />
            Home
          </div>
          <div className="listItems">
            <img src={saved} alt="Saved" className="listitemsImg" />
            Saved
          </div>
          <div className="listItems">
            <img src={rocket} alt="Rocket" className="listitemsImg" />
            Upgrade to Pro
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, i) => (
            <div key={i} className={message.isBot ? 'chat bot' : 'chat'}>
              <img className="chatImg" src={message.isBot ? gptImgLogo : userIcon} alt="" />
              <p className="txt">{message.text}</p>
            </div>
          ))}
          <div ref={msgEnd} />
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a message"
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
          <p>ChatGPT can make mistakes. Check important info.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
