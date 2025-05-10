import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function MessageList({ messages }) {
  const renderers = {
    // Custom renderer for code blocks
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline ? (
        <div className="relative">
          <SyntaxHighlighter
            style={oneDark}
            language={match?.[1] || 'text'}
            PreTag="div"
            className="rounded-md overflow-x-auto"
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
          <button
            onClick={() => navigator.clipboard.writeText(children)}
            className="absolute top-1 right-1 bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded"
          >
            Copy
          </button>
        </div>
      ) : (
        <code className="bg-gray-700 px-1 py-0.5 rounded">{children}</code>
      );
    },

    // Custom renderer for blockquotes
    blockquote({ children }) {
      return (
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-blue-200 bg-gray-700 p-2 rounded">
          {children}
        </blockquote>
      );
    },

    // Custom renderer for links
    a({ href, children }) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600 underline"
        >
          {children}
        </a>
      );
    },

    // Custom renderer for headings (H1-H6)
    h1({ children }) {
      return <h1 className="text-3xl font-bold text-yellow-300">{children}</h1>;
    },
    h2({ children }) {
      return <h2 className="text-2xl font-semibold text-yellow-200">{children}</h2>;
    },
    h3({ children }) {
      return <h3 className="text-xl font-medium text-yellow-100">{children}</h3>;
    },
    h4({ children }) {
      return <h4 className="text-lg font-medium text-yellow-100">{children}</h4>;
    },
    h5({ children }) {
      return <h5 className="text-md font-medium text-yellow-100">{children}</h5>;
    },
    h6({ children }) {
      return <h6 className="text-sm font-medium text-yellow-100">{children}</h6>;
    },

    // Custom renderer for unordered lists
    ul({ children }) {
      return (
        <ul className="list-disc pl-6 space-y-2 text-white">
          {children}
        </ul>
      );
    },

    // Custom renderer for ordered lists
    ol({ children }) {
      return (
        <ol className="list-decimal pl-6 space-y-2 text-white">
          {children}
        </ol>
      );
    },

    // Custom renderer for list items
    li({ children }) {
      return <li className="text-white">{children}</li>;
    },
  };

  return (
    <div className="space-y-4">
      {messages.map((msg, index) => {
        if (msg.type === 'user') {
          return (
            <div key={index} className="text-right">
              <div className="inline-block bg-purple-500 text-white px-4 py-2 rounded-lg">
                {msg.text}
              </div>
            </div>
          );
        }

        if (msg.type === 'bot') {
          return (
            <div key={index} className="bg-[#1A1A1A] text-white p-4 rounded-lg shadow-md">
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={renderers}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
