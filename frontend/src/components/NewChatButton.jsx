function NewChatButton({ onClick, isCollapsed }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-white bg-purple-600 hover:bg-purple-700 px-2 py-2 rounded-full transition duration-200 w-fit"
      title="New Chat"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      {!isCollapsed}
    </button>
  );
}

export default NewChatButton;
