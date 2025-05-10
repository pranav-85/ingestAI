import { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { sendMessageToBot } from '../api';

export default function ChatWindow() {
    const [messages, setMessages] = useState([
        { type: 'user', text: 'Can you summarize this document?' },
        {
            type: 'bot',
            text: `### Heading Example

Here is a [link](https://example.com)


\`\`\`js
console.log("Hello, Markdown!");
\`\`\`

- List item 1
- List item 2

> This is a quote`.trim()
        }
    ]);

    const containerRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
    }, [messages]);

    const handleSend = async (text) => {
        if (!text.trim()) return;

        const userMsg = { type: 'user', text };
        setMessages(prev => [...prev, userMsg]);

        try {
            const res = await sendMessageToBot(text);
            const botMsg = { type: 'bot', text: res.reply || 'No response.' };
            setMessages(prev => [...prev, botMsg]);
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { type: 'bot', text: 'Error communicating with bot.' }]);
        }
    };

    return (
        <div className="p-4 flex flex-col h-full m-1 font-[450] w-full">
            <div ref={containerRef} className="flex-grow overflow-y-auto p-4">
                <MessageList messages={messages} />
            </div>
            <MessageInput onSend={handleSend} />
        </div>
    );
}
