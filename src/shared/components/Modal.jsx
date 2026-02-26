import React from "react";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

      {/* Modal Card */}
      <div
        className="
          bg-white
          w-full
          max-w-lg
          max-h-[85vh]
          rounded-2xl
          shadow-2xl
          relative
          overflow-hidden
          animate-fadeIn
        "
      >

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#131921]">
            Payment Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        {/* Body (Scrollable Only If Needed) */}
        <div className="px-6 py-5 overflow-y-auto max-h-[60vh]">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;