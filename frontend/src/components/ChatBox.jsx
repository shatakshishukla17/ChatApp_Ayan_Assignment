import React, { useEffect, useRef } from 'react';

const ChatBox = ({ messages, input, setInput, sendMessage, isConnected }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow p-6 space-y-4 overflow-y-auto custom-scroll">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-6 py-3 rounded-2xl max-w-[70%] shadow-sm 
                ${msg.sender === 'user' 
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white' 
                  : 'bg-gradient-to-r from-teal-400 to-emerald-500 text-white'} 
                transition-all duration-300 hover:shadow-md`}
            >
              <p className="text-sm break-words whitespace-pre-wrap sm:text-base">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-slate-700">
        <div className="relative">
          <textarea
            className={`w-full p-4 pr-16 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none min-h-[60px]
              ${isConnected 
                ? 'border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white' 
                : 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900'}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isConnected ? "Type your message..." : "Connecting..."}
            disabled={!isConnected}
            rows="2"
          />
          <button
            onClick={sendMessage}
            disabled={!isConnected}
            className={`absolute p-3 text-white transition-all duration-300 rounded-full right-3 bottom-3 
              ${isConnected 
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600' 
                : 'bg-gray-400 cursor-not-allowed'}
              focus:outline-none focus:ring-2 focus:ring-indigo-300`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;