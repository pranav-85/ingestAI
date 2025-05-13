import ChatItem from './ChatItem';

const ChatHistory = ({ chats, onDelete, onRename, onShare, activeChatIndex, onSelectChat }) => {
    return (
        <div className="mt-4 space-y-2 w-70">
            {chats.map((chat, index) => (
                <div
                    key={index}
                    onClick={() => onSelectChat(index)}
                    className={`cursor-pointer transition duration-200 rounded-lg ${index === activeChatIndex ? 'ring-2 ring-purple-400' : ''}`}
                >
                    <ChatItem
                        chatName={chat.name}
                        onDelete={(e) => {
                            e.stopPropagation();
                            onDelete(index);
                        }}
                        onRename={(e) => {
                            e.stopPropagation();
                            onRename(index);
                        }}
                        onShare={(e) => {
                            e.stopPropagation();
                            onShare(index);
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default ChatHistory;
