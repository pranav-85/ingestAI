import ChatItem from './ChatItem';

const ChatHistory = ({ chats, onDelete, onRename, onShare }) => {
  return (
    <div className="mt-4 space-y-2 w-70">
      {chats.map((chat, index) => (
        <ChatItem
          key={index}
          chatName={chat.name}
          onDelete={() => onDelete(index)}
          onRename={() => onRename(index)}
          onShare={() => onShare(index)}
        />
      ))}
    </div>
  );
};

export default ChatHistory;
