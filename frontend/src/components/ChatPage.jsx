import React, { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Navbar from "../components/Navbar";
import ChatSessions from "../components/ChatSessions";
import ChatBox from "../components/ChatBox";
import { useUser } from "../context/UserContext";

const client = new W3CWebSocket(process.env.REACT_APP_WEBSOCKET_URL);

const ChatPage = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [activeSession, setActiveSession] = useState(null);
  const [sessions, setSessions] = useState([]);

  // Retrieve sessions from localStorage on component mount
  useEffect(() => {
    const storedSessions = JSON.parse(localStorage.getItem("sessions"));
    if (storedSessions) {
      setSessions(storedSessions);
    }
  }, []);

  // Update localStorage whenever sessions change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem("sessions", JSON.stringify(sessions));
    }
  }, [sessions]);

  // WebSocket message handling and session updates from old code
  useEffect(() => {
    if (activeSession) {
      const session = sessions.find((session) => session.name === activeSession);
      setMessages(session ? session.messages : []);
      
      client.onmessage = (message) => {
        const receivedMessage = { sender: "server", text: message.data };
        
        const updatedMessages = [...messages, receivedMessage];
        setMessages(updatedMessages);

        const updatedSessions = sessions.map((session) =>
          session.name === activeSession
            ? { ...session, messages: updatedMessages }
            : session
        );
        setSessions(updatedSessions);
        localStorage.setItem("sessions", JSON.stringify(updatedSessions));
      };
    }
  }, [activeSession, sessions, messages]);

  const sendMessage = () => {
    if (input.trim() && activeSession) {
      if (client.readyState === WebSocket.OPEN) {
        const updatedMessages = [...messages, { sender: "user", text: input }];
        setMessages(updatedMessages);
  
        const updatedSessions = sessions.map((session) =>
          session.name === activeSession
            ? { ...session, messages: updatedMessages }
            : session
        );
        setSessions(updatedSessions);
  
        client.send(input);
        setInput("");
      } else {
        console.error("WebSocket is not open. Unable to send message.");
      }
    }
  };

  const createSession = (name) => {
    if (sessions.some((session) => session.name === name)) {
      alert("Session already exists!");
      return;
    }

    const newSession = { name, messages: [] };
    const updatedSessions = [...sessions, newSession];

    setSessions(updatedSessions);
    setActiveSession(name);
    localStorage.setItem("sessions", JSON.stringify(updatedSessions));
  };

  const selectSession = (sessionName) => {
    setActiveSession(sessionName);
    const session = sessions.find((s) => s.name === sessionName);
    setMessages(session ? session.messages : []);
  };

  const deleteSession = (sessionName) => {
    const updatedSessions = sessions.filter((session) => session.name !== sessionName);
    setSessions(updatedSessions);

    if (activeSession === sessionName) {
      setActiveSession(null);
      setMessages([]);
    }

    localStorage.setItem("sessions", JSON.stringify(updatedSessions));
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-800 to-slate-700">
      <Navbar />
      <div className="flex flex-col flex-1 gap-4 p-4 overflow-hidden md:flex-row">
        <div className="w-full overflow-hidden transition-all duration-300 bg-white shadow-lg md:w-1/4 dark:bg-slate-800 rounded-xl md:h-full">
          <ChatSessions
            onCreateSession={createSession}
            sessions={sessions}
            onSelectSession={selectSession}
            onDeleteSession={deleteSession}
            activeSession={activeSession}
          />
        </div>
        <div className="flex flex-col flex-grow overflow-hidden bg-white shadow-lg dark:bg-slate-800 rounded-xl">
          {activeSession ? (
            <ChatBox
              messages={messages}
              input={input}
              setInput={setInput}
              sendMessage={sendMessage}
              isConnected={client.readyState === WebSocket.OPEN}
            />
          ) : (
            <div className="flex items-center justify-center flex-grow p-8 text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <div className="mb-4 text-6xl">💬</div>
                <p className="text-xl font-light">Select a session to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;