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
  const [chats, setChats] = useState([
    { name: 'Chat 1' },
    { name: 'Chat 2' },
    { name: 'Chat 3' },
  ]);

  const handleDelete = (index) => {
    const updatedChats = chats.filter((_, i) => i !== index);
    setChats(updatedChats);
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

  return (
    <div className="h-screen w-full flex bg-[#252525]">
      <div
        className={`transition-all duration-300 ease-out ${isSidebarCollapsed ? 'w-16' : 'w-81'
          } bg-[#1A1A1A] p-4 flex flex-col justify-between h-full transition-all duration-300`}
      >
        <div className='w-80'>
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isCollapsed={isSidebarCollapsed}
            toggleSidebar={() => setSidebarCollapsed(prev => !prev)}
            setChats={setChats}
            isSidebarCollapsed={isSidebarCollapsed}
          />
          {!isSidebarCollapsed && (
            <ChatHistory
              chats={chats}
              onDelete={handleDelete}
              onRename={handleRename}
              onShare={handleShare}
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
          {activeTab === 'upload' ? <DocumentUploader /> : <ChatWindow />}
        </div>
      </div>
    </div>
  );
}

export default App;
