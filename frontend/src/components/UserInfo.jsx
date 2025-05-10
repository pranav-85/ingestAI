const UserInfo = ({ email, onLogout }) => {
  return (
    <div className="mt-auto bg-[#2a2a2a] p-4 rounded-lg text-white shadow-md flex justify-between items-center w-70">
      <div>
        <div className="text-sm mb-2 text-gray-300">Logged in as</div>
        <div className="text-md font-medium text-purple-400 truncate">{email}</div>
      </div>
      <button
        onClick={onLogout}
        className="mt-3 bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-full transition"
      >
        Logout
      </button>
    </div>
  );
};

export default UserInfo;
