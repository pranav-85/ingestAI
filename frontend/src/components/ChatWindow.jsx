import { useRef, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { sendMessageToBot } from '../api';

export default function ChatWindow({ chat, updateChatMessages }) {
    const containerRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
    }, [chat.messages]);

    const handleSend = async (text) => {
        if (!text.trim()) return;

        const userMsg = { type: 'user', text };
        updateChatMessages([...chat.messages, userMsg]);

        try {
            const res = await sendMessageToBot(text);
            const botMsg = { type: 'bot', text: res.reply || 'No response.' };
            updateChatMessages(prev => [...prev, botMsg]);
        } catch (err) {
            console.error(err);
            updateChatMessages(prev => [...prev, { type: 'bot', text: 'Error communicating with bot.' }]);
        }
    };

    return (
        <div className="p-4 flex flex-col h-full m-1 font-[450] w-full">
            <div ref={containerRef} className="flex-grow overflow-y-auto p-4">
                <MessageList messages={chat.messages} />
            </div>
            <MessageInput onSend={handleSend} />
        </div>
    );
}