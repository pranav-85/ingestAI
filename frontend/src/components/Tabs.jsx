import NewChatButton from "./NewChatButton";

function Tabs({ activeTab, setActiveTab, isCollapsed, toggleSidebar, setChats, isSidebarCollapsed, onNewChat}) {
    return (
        <div className="pl-1 rounded-r-md w-fit">
            <div className={`flex items-center justify-between ${isCollapsed ? 'justify-center' : ''} flex-wrap`}>
                <div className={`flex items-center justify-between ${isCollapsed ? 'justify-center' : ''} flex-wrap`}>
                    <button
                        onClick={toggleSidebar}
                        className="text-purple-400 hover:text-purple-200 self-start mb-2 ml-1 text-2xl"
                        title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                    >
                        {isCollapsed ? '»' : '«'}
                    </button>
                </div>

                {!isCollapsed && (<div className="bg-[#1A1A1A] px-6 py-4 text-2xl font-bold shadow-sm flex items-center">
                    <button
                        ref={(buttonRef) => console.log(buttonRef)}
                        className="bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-400 
                text-transparent bg-clip-text 
                bg-[length:200%_200%] bg-left 
                hover:bg-right 
                transition-all duration-1000 
                ease-in-out"
                        style={{
                            backgroundImage:
                                'linear-gradient(270deg, #a855f7, #d946ef, #a855f7)', // looped purple-fuchsia-purple
                        }}
                    >
                        Ingest AI
                    </button>
                </div>)}
            </div>

            
                <div className="flex justify-start items-center space-x-2 mt-2">
                    <NewChatButton
                        isCollapsed={isSidebarCollapsed}
                        onClick={onNewChat}
                    />
                    {!isCollapsed && (<p className="text-white mt-1 font-[550]">New Chat</p>)}
                </div>

            {!isCollapsed && (
                <div className="flex space-x-1 w-70 mt-2">
                    <button
                        onClick={() => setActiveTab('upload')}
                        className={`w-40 px-4 py-2 text-sm text-center rounded-t-md ${activeTab === 'upload'
                                ? 'border-b-2 text-white border-purple-500 font-semibold'
                                : 'text-purple-500 font-medium'
                            }`}
                    >
                        Upload Docs
                    </button>

                    <button
                        onClick={() => setActiveTab('chat')}
                        className={`w-40 px-4 py-2 text-sm text-center rounded-t-md ${activeTab === 'chat'
                                ? 'border-b-2 text-white border-purple-500 font-semibold'
                                : 'text-purple-500 font-medium'
                            }`}
                    >
                        Chat
                    </button>
                </div>
            )}
        </div>
    );
}

export default Tabs;
