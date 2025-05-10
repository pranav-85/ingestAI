export default function Message({ type, text }) {
  const isUser = type === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-md px-4 py-2 rounded-lg shadow ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'}`}>
        {text}
      </div>
    </div>
  );
}
