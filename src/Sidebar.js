export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div
      className={`bg-gray-800 text-white w-64 p-4 flex flex-col ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <h2 className="text-lg font-bold mb-4">Chat History</h2>

      {/* Placeholder chats */}
      <div className="flex-1 overflow-auto space-y-2">
        <div className="bg-gray-700 p-2 rounded">Chat 1</div>
        <div className="bg-gray-700 p-2 rounded">Chat 2</div>
      </div>

      <button className="bg-red-500 mt-4 px-3 py-1 rounded">Logout</button>
    </div>
  );
}
