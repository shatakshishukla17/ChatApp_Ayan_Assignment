import React, { useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { HiUserCircle, HiPlus } from 'react-icons/hi';

const ChatSessions = ({ onCreateSession, sessions, onSelectSession, onDeleteSession }) => {
  const [sessionName, setSessionName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateSession = () => {
    if (sessionName.trim()) {
      onCreateSession(sessionName);
      setSessionName('');
      setIsOpen(false);
    }
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="flex flex-col h-full">
      {/* Heading with create button */}
      <div className="p-4 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Chat Sessions</h2>
          <button
            onClick={openModal}
            className="p-2 text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            title="Create New Session"
          >
            <HiPlus className="text-xl" />
          </button>
        </div>
      </div>

      {/* Sessions list */}
      <div className="flex-grow p-4 space-y-3 overflow-y-auto custom-scroll">
        {sessions.length > 0 ? (
          sessions.map((session, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 transition-all duration-200 cursor-pointer bg-gray-50 dark:bg-slate-700 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-600 hover:shadow-md"
              onClick={() => onSelectSession(session.name)}
            >
              <div className="flex items-center space-x-3 truncate">
                <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-800">
                  <HiUserCircle className="text-2xl text-blue-500 dark:text-blue-300" />
                </div>
                <div className="font-medium text-gray-800 truncate dark:text-white">{session.name}</div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSession(session.name);
                }}
                className="text-gray-400 transition-colors duration-200 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                title="Delete Session"
              >
                <HiOutlineTrash className="text-xl" />
              </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <div className="mb-4 text-5xl">📝</div>
            <p className="text-center">No active sessions</p>
            <p className="mt-2 text-sm text-center">Click the + button to create one</p>
          </div>
        )}
      </div>

      {/* Modal for creating a session */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 transition-all duration-300 transform scale-100 bg-white shadow-xl dark:bg-slate-800 rounded-xl w-80">
            <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Create a New Session</h3>
            <input
              type="text"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              placeholder="Enter session name"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 transition-colors duration-200 bg-gray-200 rounded-lg dark:bg-slate-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSession}
                className="px-4 py-2 text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Create Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSessions;