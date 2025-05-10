import { useState, useRef, useEffect } from 'react';

const ChatItem = ({ chatName, onDelete, onRename, onShare }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const handleMenuToggle = () => {
        setShowMenu(prev => !prev);
    };

    // Close the menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex items-center justify-between py-2 px-4 bg-purple-500 text-white rounded-lg mb-2 hover:bg-purple-600 transition duration-200">
            <span className="flex-grow text-sm font-semibold">{chatName}</span>
            <div className="relative" ref={menuRef}>
                <button onClick={handleMenuToggle} className="text-xl">
                    &#x22EE; {/* Three dots */}
                </button>
                {showMenu && (
                    <div className="absolute p-2 z-10 right-5 top-0 mt-2 bg-[#171716] text-white rounded-xl shadow-lg w-fit">
                        <button onClick={onDelete} className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-purple-700 w-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 256 256"
                                fill="currentColor"
                                className="text-white"
                            >
                                <g transform="scale(10.66667,10.66667)">
                                    <path d="M10.80664,2c-0.517,0 -1.01095,0.20431 -1.37695,0.57031l-0.42969,0.42969h-5c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h16c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-5l-0.42969,-0.42969c-0.365,-0.366 -0.85995,-0.57031 -1.37695,-0.57031zM4.36523,7l1.52734,13.26367c0.132,0.99 0.98442,1.73633 1.98242,1.73633h8.24805c0.998,0 1.85138,-0.74514 1.98438,-1.74414l1.52734,-13.25586z"></path>
                                </g>
                            </svg>
                            Delete
                        </button>

                        <button onClick={onRename} className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-purple-700 w-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 256 256"
                                fill="currentColor"
                                className="text-white"
                            >
                                <g transform="scale(4,4)">
                                    <path d="M22,51c-1,-1 -4,-1 -4,-1l-0.425,-1.274c-0.362,-1.086 -1.215,-1.939 -2.301,-2.301l-1.274,-0.425c0,0 0.5,-2.5 -1,-4l25,-25l8,10zM52,21l-9,-9l4.68,-4.68c0,0 3.5,-1.5 7,2c3.5,3.5 2,7 2,7zM9,50l-1.843,4.476c-0.614,1.49 0.877,2.981 2.367,2.367l4.476,-1.843z"></path>
                                </g>
                            </svg>
                            Rename
                        </button>

                        <button onClick={onShare} className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-purple-700 w-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20" height="20" viewBox="0 0 256 256" fill="currentColor"
                                className="text-white"
                            >
                                <g fill="currentColor">
                                    <g transform="scale(5.12,5.12)">
                                        <path d="M46.137,6.552c-0.75,-0.636 -1.928,-0.727 -3.146,-0.238h-0.002c-1.281,0.514 -36.261,15.518 -37.685,16.131c-0.259,0.09 -2.521,0.934 -2.288,2.814c0.208,1.695 2.026,2.397 2.248,2.478l8.893,3.045c0.59,1.964 2.765,9.21 3.246,10.758c0.3,0.965 0.789,2.233 1.646,2.494c0.752,0.29 1.5,0.025 1.984,-0.355l5.437,-5.043l8.777,6.845l0.209,0.125c0.596,0.264 1.167,0.396 1.712,0.396c0.421,0 0.825,-0.079 1.211,-0.237c1.315,-0.54 1.841,-1.793 1.896,-1.935l6.556,-34.077c0.4,-1.82 -0.156,-2.746 -0.694,-3.201zM22,32l-3,8l-3,-10l23,-17z"></path>
                                    </g>
                                </g>
                            </svg>
                            Share
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatItem;
