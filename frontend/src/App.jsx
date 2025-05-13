import { useState } from 'react';
import Tabs from './components/Tabs';
import DocumentUploader from './components/DocumentUploader';
import ChatWindow from './components/ChatWindow';
import ChatHistory from './components/ChatHistory';
import UserInfo from './components/UserInfo';

function App() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const userEmail = "user@example.com";
  const [activeTab, setActiveTab] = useState('chat');
  const [activeChatIndex, setActiveChatIndex] = useState(null);

  const [chats, setChats] = useState([
    { name: 'Chat 1', messages: [] },
    { name: 'Chat 2', messages: ['Hi from Chat 2'] },
    { name: 'Chat 3', messages: ['Chat 3 has some text'] },
  ]);

  const handleDelete = (index) => {
    const updatedChats = chats.filter((_, i) => i !== index);
    setChats(updatedChats);

    // If deleted chat was active, reset activeChatIndex
    if (index === activeChatIndex) {
      setActiveChatIndex(null);
    } else if (index < activeChatIndex) {
      // Shift activeChatIndex left if earlier chat is deleted
      setActiveChatIndex((prev) => prev - 1);
    }
  };

  const handleRename = (index) => {
    const newName = prompt('Enter new name for the chat:', chats[index].name);
    if (newName) {
      const updatedChats = [...chats];
      updatedChats[index].name = newName;
      setChats(updatedChats);
    }
  };

  const handleShare = (index) => {
    alert(`Sharing ${chats[index].name}...`);
  };

  const handleLogout = () => {
    alert('Logged out');
  };

  const handleAddChat = () => {
    const newChat = { name: `Chat ${chats.length + 1}`, messages: [] };
    const updatedChats = [...chats, newChat];
    setChats(updatedChats);
    setActiveChatIndex(updatedChats.length - 1); // activate the new chat
  };

  return (
    <div className="h-screen w-full flex bg-[#252525]">
      <div
        className={`transition-all duration-300 ease-out ${isSidebarCollapsed ? 'w-16' : 'w-81'
          } bg-[#1A1A1A] p-4 flex flex-col justify-between h-full`}
      >
        <div className='w-80'>
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isCollapsed={isSidebarCollapsed}
            toggleSidebar={() => setSidebarCollapsed(prev => !prev)}
            setChats={setChats}
            isSidebarCollapsed={isSidebarCollapsed}
            onAddChat={handleAddChat} // add this prop
          />
          {!isSidebarCollapsed && (
            <ChatHistory
              chats={chats}
              onDelete={handleDelete}
              onRename={handleRename}
              onShare={handleShare}
              activeChatIndex={activeChatIndex}
              onSelectChat={(index) => setActiveChatIndex(index)}
            />
          )}
        </div>
        {!isSidebarCollapsed && (
          <div className="mt-auto">
            <UserInfo email={userEmail} onLogout={handleLogout} />
          </div>
        )}
      </div>
      <div className="flex-grow flex flex-col overflow-hidden">
        <div className="flex-grow overflow-hidden p-4">
          {activeTab === 'upload' ? (
            <DocumentUploader />
          ) : (
            activeChatIndex !== null &&
            chats[activeChatIndex] && (
              <ChatWindow
                chat={chats[activeChatIndex]}
                updateChatMessages={(newMessagesOrUpdater) => {
                  setChats(prevChats => {
                    const updatedChats = [...prevChats];
                    const newMessages = typeof newMessagesOrUpdater === 'function'
                      ? newMessagesOrUpdater(prevChats[activeChatIndex].messages)
                      : newMessagesOrUpdater;

                    updatedChats[activeChatIndex] = {
                      ...prevChats[activeChatIndex],
                      messages: newMessages
                    };

                    return updatedChats;
                  });
                }}
              />

            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;