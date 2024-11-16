import React from 'react';

interface DialogBoxProps {
  handdleclick: () => void;
  confirmDelete: () => void;
}

export function DialogBox({ handdleclick, confirmDelete }: DialogBoxProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete this task?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={handdleclick}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
