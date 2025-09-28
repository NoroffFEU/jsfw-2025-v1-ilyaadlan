import { useEffect } from 'react';

// Toast Component
// Displays notification messages for user feedback
export default function Toast({ message, type, onClose }) {
  // Auto-close toast after 3 seconds
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`fixed top-4 right-4 max-w-xs w-full z-50 px-6 py-4 rounded-xl shadow-lg text-white text-base flex items-center gap-3
        ${type === 'error' ? 'bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400' : 'bg-gradient-to-r from-blue-400 via-blue-200 to-white'}
        backdrop-blur-md border border-blue-200/40
        transition-transform duration-300 ease-in-out
      `}
      style={{ boxShadow: '0 8px 32px rgba(30,64,175,0.15)', background: 'rgba(255,255,255,0.15)' }}
    >
      {/* Snowflake icon for winter theme */}
      <span className="text-2xl mr-2" aria-label="Snowflake" role="img">
        ❄️
      </span>
      <span className="flex-1 drop-shadow-sm">{message}</span>
      <button
        onClick={onClose}
        aria-label="Close notification"
        className="ml-2 text-white hover:text-blue-100 text-xl font-bold"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        ×
      </button>
    </div>
  );
}
