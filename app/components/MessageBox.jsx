export default function MessageBox({ message, setMessage, onSend }) {
  return (
    <div className="border-t pt-3 flex items-center gap-2">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write a message..."
        className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none"
      />

      <button
        onClick={onSend}
        disabled={!message.trim()}
        className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm disabled:opacity-50"
      >
        Send
      </button>
    </div>
  );
}
